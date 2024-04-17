Setting up and viewing MySQL server using the command line:

1. Install mysql. This can be done using homebrew. run: brew install mysql
2. Start mysql service. This can be done using homebrew. run: brew services start mysql
3. run: mysql
4. run: CREATE DATABASE StudySprintDatabase;
5. run: CREATE USER '471Team'@'localhost' IDENTIFIED BY ‘471Password';
6. run: GRANT ALL PRIVILEGES ON StudySprintDatabase.* TO ‘471Team'@'localhost';
7. run: FLUSH PRIVILEGES;
8. Exit mysql shell by running: exit
9. run: pip install mysqlclient



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
