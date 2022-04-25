# MarketVision

### Setup Python Virtual Environment (linux)
```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Setup Python Virtual Environment (windows)
```
python -m venv venv
cd venv\Scripts\
.\activate.bat
cd ..\..\
pip install -r requirements.txt
```

**Note:** use `pip-autoremove` to uninstall packages

### Setup React
```
cd react
npm install package-lock.json
npm run build
```

### Setup Environment Variables
```
cp .env-example .env
```

- modify variables inside `.env`

- place sensitive information like auth creds in `.env`

### Start Django Server
```
cd MarketVision
python manage.py runserver
```

## Directory Structure

- MarketVision: Django project files

- MarketVision/MarketVision: Django settings

- MarketVision/app: contains models, graphql schema, and python wrapper for APIs

- MarketVision/react: frontend react files
