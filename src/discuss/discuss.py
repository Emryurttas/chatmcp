import valkey
import json

r = valkey.Valkey(host='localhost', port=6379, db=0)

p = r.pubsub()

p.subscribe('message')

print("Connecté au serveur Valkey")
print("En écoute sur le canal 'message'...")
print("-" * 50)

for message in p.listen():
    if message['type'] == 'message':
        data = json.loads(message['data'])
        
        print(f"[{data['date']}] {data['sender']}: {data['content']}")