import graphene
from graphene_django.types import DjangoObjectType, ObjectType
import json

from .models import *
from .api import *

class CryptoRatesType(DjangoObjectType):
    class Meta:
        model = CryptoRates
        field = "__all__"

class CryptoDailyType(DjangoObjectType):
    class Meta:
        model = CryptoDaily
        field = "__all__"

class CryptoCoinsType(DjangoObjectType):
    class Meta:
        model = CryptoCoins
        field = "__all__"

class NewsArticlesType(DjangoObjectType):
    class Meta:
        model = NewsArticles
        field = "__all__"

class NFTStatsType(DjangoObjectType):
    class Meta:
        model = NFTStats
        field = "__all__"

class FundamentalStatsType(DjangoObjectType):
    class Meta:
        model = FundamentalStats
        field = "__all__"

class Query(ObjectType):
    cryptoRates = graphene.List(
        CryptoRatesType,
        filter_set = graphene.String(required=False, default_value="{}"),
        ticker = graphene.String(
            required=False,
            default_value="BTC,ETH,XRP,DOGE,LTC,BCH,ADA,XLM,BNB,USDT"
        ),
        conversion = graphene.String(required=False, default_value="USD")
    )

    cryptoDaily = graphene.List(
        CryptoDailyType,
        filter_set = graphene.String(required=False, default_value="{}"),
        ticker = graphene.String(),
        limit = graphene.Int()
    )

    cryptoCoins = graphene.List(
        CryptoCoinsType,
        filter_set = graphene.String(required=False, default_value="{}"),
        ticker = graphene.String(
            required=False,
            default_value="BTC,ETH,XRP,DOGE,LTC,BCH,ADA,XLM,BNB,USDT"
        )
    )

    newsArticles = graphene.List(
        NewsArticlesType,
        filter_set = graphene.String(required=False, default_value="{}"),
        topic = graphene.String(),
    )

    nftStats = graphene.List(
        NFTStatsType,
        filter_set = graphene.String(required=False, default_value="{}"),
        limit = graphene.Int(required=False, default_value=10)
    )

    fundamentalStats = graphene.List(
        FundamentalStatsType,
        filter_set = graphene.String(required=False, default_value="{}"),
    )

    def resolve_cryptoRates(root, info, filter_set, ticker, conversion):
        CryptoRates.objects.all().delete()

        crypto_api = CryptoCompare()
        fsyms = ticker
        r = crypto_api.multi_symbol_price(fsyms=fsyms, tsyms=conversion)

        for crypto, val in r.items():
            row = CryptoRates(
                cryptocurrency=crypto,
                exchangeRate=val[conversion]
            )
            row.save()
        return process_filters(filter_set, CryptoRates)

    def resolve_cryptoDaily(root, info, filter_set, ticker, limit):
        CryptoDaily.objects.all().delete()
        crypto_api = CryptoCompare()
        r = crypto_api.daily_pair_ohlcv(fsym=ticker, tsym='USD', limit=limit)

        close_vals = list()
        for idx in r['Data']['Data']:
            close_vals.append(idx['close'])

        row = CryptoDaily(
            cryptocurrency=ticker,
            historicalHLOC=close_vals
        )
        row.save()
        return process_filters(filter_set, CryptoDaily)

    def resolve_cryptoCoins(root, info, filter_set, ticker):
        CryptoCoins.objects.all().delete()
        crypto_api = CryptoCompare()
        r = crypto_api.coin_list()

        for coin in r['Data'].values():
            if coin['Symbol'] in ticker.split(','):
                row = CryptoCoins(
                    symbol=coin['Symbol'],
                    coinName=coin['CoinName'],
                    description=coin['Description']
                )
                row.save()
        return process_filters(filter_set, CryptoCoins)

    def resolve_newsArticles(root, info, filter_set, topic):
        NewsArticles.objects.all().delete()
        news_api = DataNews()
        articles = news_api.articles(topic)

        for article in articles:
            news = NewsArticles(
                url=article['url'],
                authors=article['authors'],
                title=article['title'],
                description=article['description'],
                imageURL=article['imageUrl'],
                content=article['content']
            )
            news.save()
        return process_filters(filter_set, NewsArticles)

    def resolve_nftStats(root, info, filter_set, limit):
        NFTStats.objects.all().delete()
        nft_api = OpenSea()
        r = nft_api.assets(
            order_by='visitor_count',
            order_direction="desc",
            limit=limit
        )

        # setup nsfw filter
        nsfw_json = open('app/words.json', 'r')
        nsfw_filter = set(json.load(nsfw_json))

        for asset in r['assets']:
            price = 0
            if asset['description'] and nsfw_filter.intersection(set(''.join(c for c in asset['description'] if c.isalnum() or c == ' ').lower().split())):
                    continue
            if asset['last_sale']:
                price = asset['last_sale']['payment_token']['usd_price']
            row = NFTStats(
                imageURL=asset['image_url'],
                imageThumbnail=asset['image_thumbnail_url'],
                animationURL=asset['animation_url'],
                name=asset['name'],
                description=asset['description'],
                price=price
            )
            row.save()
        nsfw_json.close()
        return process_filters(filter_set, NFTStats)

    def resolve_fundamentalStats(root, info, filter_set):
        return process_filters(filter_set, FundamentalStats)

# helper functions
def build_query_set(condition_str, values, query_set):
    for key, val in values.items():
        query_set[key + '__' + condition_str] = val

def process_filters(filter_set, model):
    # pass json in form { 'condition' : { 'param_name' : 'value' } }
    filter_set = json.loads(filter_set)
    query_set = dict()
    for condition, vals in filter_set.items():
        if condition == 'gt':
            build_query_set(condition, vals, query_set)
        elif condition == 'gte':
            build_query_set(condition, vals, query_set)
        elif condition == 'lt':
            build_query_set(condition, vals, query_set)
        elif condition == 'lte':
            build_query_set(condition, vals, query_set)
        elif condition == 'icontains':
            build_query_set(condition, vals, query_set)
        elif condition == 'exact':
            build_query_set(condition, vals, query_set)

    # return filtered data if filters are specified otherwise return all data
    if query_set:
        return model.objects.filter(**query_set)
    else:
        return model.objects.all()

schema = graphene.Schema(query=Query)
