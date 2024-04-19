Setting up and viewing MySQL database using the command line:

1. Install mysql. This can be done using homebrew. run: brew install mysql
2. Start mysql service. This can be done using homebrew. run: brew services start mysql
3. run: mysql
4. run: CREATE DATABASE StudySprintDatabase;
5. run: CREATE USER '471Team'@'localhost' IDENTIFIED BY ‘471Password';
6. run: GRANT ALL PRIVILEGES ON StudySprintDatabase.* TO ‘471Team'@'localhost';
7. run: FLUSH PRIVILEGES;
8. Exit mysql shell by running: exit



Instructions for running:

1. Make sure python is installed in project. This can be done with homebrew: brew install python
2. Activate virtual environment: source env/bin/activate (macOS or Linux, this step can be skipped on Windows)
3. run: pip install -r requirements.txt (must do this fron backend directory)
4. If step 3 did not work:
   - Install django. This can be done using pip: pip install django
   - Install Django cors-headers. run: pip install django-cors-headers
   - Install Django Rest Framework. run: pip install djangorestframework
   - run: pip install mysqlclient
   - run: pip install asgiref
   - run: pip install sqlparse
10. open two different terminal windows — in one window, do change directory to backend: cd backend/, in the other change
directory to frontend: cd frontend/
11. In backend directory:
   - run: python manage.py makemigrations
   - run: python manage.py migrate
   - run: python manage.py runserver
11. In frontend directory:
   - run: npm install
   - run: npm run dev
