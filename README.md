mvn clean install -rf :ui-ngx -DskipTests -Dlicense.skip=true mvn clean install -rf :application -DskipTests -Dlicense.skip=true

mvn clean install -DskipTests --% -Dlicense.skip=true
mvn clean install --% -Dmaven.test.skip=true -Dlicense.skip=true


mvn clean install -Dlicense.skip=true

ng generate component gateway-device-tab --flat --skip-tests mvn clean install -DskipTests -Dlicense.skip=true -rf org.thingsboard.transport:http mvn clean install -rf org.thingsboard.transport:http -DskipTests -Dlicense.skip=true mvn -rf org.thingsboard.transport:http -DskipTests -Dlicense.skip=true

#CMD for postgres database

In linux:
Backup: $ pg_dump -U {user-name} {source_db} -f {dumpfilename.sql}

Restore: $ psql -U {user-name} -d {desintation_db} -f {dumpfilename.sql}

pg_restore -h localhost -p 5432 -U postgres -d my_new_database my_old_database.backup psql -h localhost -U postgres -p 5432 thingsboard < my_old_database.backup

sudo -u postgres pg_dump -Fc mydb > ./mydb.sql sudo -u postgres dropdb mydb sudo -u postgres createdb -O db_user mydb sudo -u postgres pg_restore -d mydb < ./mydb.sqlmvn -v
