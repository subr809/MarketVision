from django.db import models
from django.contrib.postgres.fields import ArrayField

class CryptoRates(models.Model):
    id = models.AutoField(primary_key=True)
    cryptocurrency = models.CharField(max_length=300, blank=True, null=True)
    exchangeRate = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)

    class meta:
        db_table = 'crypto_stats'

class CryptoDaily(models.Model):
    cryptocurrency = models.CharField(max_length=300, primary_key=True)
    dailyHLOC = ArrayField(models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True))

    class meta:
        db_table = 'crypto_historical'

class CryptoCoins(models.Model):
    id = models.AutoField(primary_key=True)
    symbol = models.CharField(max_length=500)
    coinName = models.CharField(max_length=500)
    description = models.TextField()

class NewsArticles(models.Model):
    id = models.AutoField(primary_key=True)
    url = models.CharField(max_length=500, blank=True, null=True)
    authors = ArrayField(models.CharField(max_length=100, blank=True, null=True))
    title = models.CharField(max_length=500, blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)
    imageURL = models.CharField(max_length=500, blank=True, null=True)
    content = models.CharField(max_length=10000, blank=True, null=True)

    class meta:
        db_table = 'news_articles'

class NFTStats(models.Model):
    id = models.AutoField(primary_key=True)
    imageURL = models.CharField(max_length=500, blank=True, null=True)
    imageThumbnail = models.CharField(max_length=500, blank=True, null=True)
    animationURL = models.CharField(max_length=500, blank=True, null=True)
    name = models.CharField(max_length=300, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)

    class meta:
        db_table = 'nft_stats'

class FundamentalStats(models.Model):
    id = models.AutoField(primary_key=True)
    ticker = models.CharField(max_length=126, blank=True, null=True)
    debtToEquity = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    dividendYield = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    eps = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    freeCashFlowPerShare = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    marketCap = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    priceToBook = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    priceToEarnings = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    industry = models.CharField(max_length=126, blank=True, null=True)
    sector = models.CharField(max_length=126, blank=True, null=True)
    country = models.CharField(max_length=126, blank=True, null=True)
    employees = models.IntegerField(blank=True, null=True)
    epsNext5Yr = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    epsPrev5Yr = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    epsThisYr = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    roe = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    roa = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    roi = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    volume = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)
    beta = models.DecimalField(max_digits=1000, decimal_places=10, blank=True, null=True)

    class meta:
        db_table = 'fundamental_stats'
