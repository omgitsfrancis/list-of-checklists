# Run this to build Image:

docker build -t sql-test .

# Run this to start deploy DB image to container:

docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=YourStrong!Passw0rd' -p 1433:1433 -d sql-test