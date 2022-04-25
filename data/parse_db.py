import pandas as pd
import numpy as np

df = pd.read_csv('database.csv')
#types = df.columns.dtypes

for idx in range(len(df.values)):
    for col in range(len(df.columns)):
        # set null
        if df.iloc[idx][col] == '-':
            df = df.replace(df.iloc[idx][col], np.NaN)

        if col == 5:
            tmp = df.iloc[idx][col] * 10**-6
            df = df.replace(df.iloc[idx][col], tmp)

df.to_csv('db_clean.csv', index=False)
