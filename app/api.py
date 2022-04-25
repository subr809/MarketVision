import requests
import datanews
import os

class API:
    def __init__(self, api_key, api_url):
        self.api_key = api_key
        self.api_url = api_url
        self.timeout = 100
        self.params = dict()
        self.headers = dict()

    def process_kwargs(self, kwargs, params, param_set):
        for key, value in kwargs.items():
            if key not in param_set:
                raise RuntimeError(f'invalid parameter {key}')
            else:
                self.params[key] = value

class Polygon(API):
    def __init__(self):
        super().__init__(
            os.getenv('POLYGON_API_KEY'),
            'https://api.polygon.io/v2'
        )
        self.params['apiKey'] = self.api_key

    def aggregates(
        self,
        stocks_ticker,
        multiplier,
        timespan,
        from_date,
        to_date,
        **kwargs
    ):
        query_url = f'/aggs/ticker/{stocks_ticker}/range/{multiplier}/{timespan}/{from_date}/{to_date}'

        param_set = [
            'unadjusted',
            'sort',
            'limit'
        ]
        self.process_kwargs(kwargs, self.params, param_set)

        r = requests.request(
            'GET', self.api_url + query_url,
            params=self.params, timeout=self.timeout
        )
        r.raise_for_status()
        return r.json()

class OpenSea(API):
    def __init__(self):
        super().__init__(
            os.getenv('OPENSEA_API_KEY'),
            'https://api.opensea.io/api/v1/assets'
        )
        self.headers['x-api-key'] = self.api_key

    def assets(self, **kwargs):
        param_set = [
            'owner',
            'token_ids',
            'asset_contract_address',
            'asset_contract_addresses',
            'order_by',
            'order_direction',
            'offset',
            'limit',
            'collection'
        ]
        self.process_kwargs(kwargs, self.params, param_set)

        r = requests.request(
            'GET', self.api_url, params=self.params,
            headers=self.headers, timeout=self.timeout
        )
        r.raise_for_status()
        return r.json()

class CryptoCompare(API):
    def __init__(self):
        super().__init__(
            os.getenv('CRYPTOCOMPARE_API_KEY'),
            'https://min-api.cryptocompare.com/data/'
        )
        self.params['api_key'] = self.api_key

    def multi_symbol_price(self, fsyms, tsyms, **kwargs):
        param_set = [
            'tryConversion',
            'relaxedValidation',
            'e',
            'extraParams',
            'sign'
        ]
        self.params['fsyms'] = fsyms
        self.params['tsyms'] = tsyms
        self.process_kwargs(kwargs, self.params, param_set)

        r = requests.request(
            'GET', self.api_url + 'pricemulti',
            params=self.params, timeout = self.timeout
        )
        r.raise_for_status()
        return r.json()

    def daily_pair_ohlcv(self, fsym, tsym, **kwargs):
        param_set = [
            'tryConversion',
            'e',
            'aggregate',
            'aggregatePredictableTimePeriods',
            'limit',
            'allData',
            'toTs',
            'explainPath',
            'extraParams',
            'sign'
        ]
        self.params['fsym'] = fsym
        self.params['tsym'] = tsym
        self.process_kwargs(kwargs, self.params, param_set)

        r = requests.request(
            'GET', self.api_url + 'v2/histoday',
            params=self.params, timeout = self.timeout
        )
        r.raise_for_status()
        return r.json()

    def coin_list(self):
        r = requests.request(
                'GET', self.api_url + 'all/coinlist',
                timeout = self.timeout
        )
        r.raise_for_status()
        return r.json()

class DataNews():
    def __init__(self):
        datanews.api_key = os.getenv('DATANEWS_API_KEY')

    def articles(topic):
        r = datanews.news(
            q=topic, sortBy="relevance", country="us", language=['en']
        )
        articles = r['hits']
        return articles
