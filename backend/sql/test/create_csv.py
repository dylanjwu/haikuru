import csv
import random as r
import uuid

header = ['email', 'last_name', 'username', 'first_name', 'password']

firstnames = [l.strip() for l in open('firstnames.txt', 'r').readlines()]
lastnames = [l.strip() for l in open('lastnames.txt', 'r').readlines()]

rows = []
usernames = set()
for i in range(10000):
    username = None
    rand_i = 0
    rand_j = 0
    while username == None or username in usernames: 
        rand_i = r.randint(0, len(firstnames)-1)
        rand_j = r.randint(0, len(lastnames)-1)
        username = f'{firstnames[rand_i]}{lastnames[rand_j]}'.lower()
    
    usernames.add(username)

    row = [f'{username}@gmail.com', lastnames[rand_j].title(), username, firstnames[rand_i].title(), 'password']
    rows.append(row)
print(rows)

with open('users.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(rows)