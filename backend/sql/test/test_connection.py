import psycopg2
import csv




try:
    conn = psycopg2.connect(user="dylan", password="dylan123", host="my-db-instance.cq0mezfgdqbr.us-east-1.rds.amazonaws.com ", port=5432, database="my_db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")

except (Exception) as error:
    print(error) 
finally:
    if (conn): 
        cursor.close()
        conn.close()

