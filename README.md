Instructions for running:

1. Make sure python is installed in project. This can be done with homebrew: brew install python
2. Activate virtual environment: source env/bin/activate (macOS or Linux, this step can be skipped on Windows)
3. Install django. This can be done using pip: pip install django
4. open two different terminal windows — in one window, do change directory to backend: cd backend/, in the other change
directory to frontend: cd frontend/
5. In backend directory:
   - run: python manage.py makemigrations
   - run: python manage.py migrate
   - run: python manage.py runserver
6. In frontend directory:
   - run: npm install
   - run: npm run dev
