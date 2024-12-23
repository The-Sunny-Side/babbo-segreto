import random
import json
import base64

# Liste di password e nomi
password = ["simo123", "cricri", "davidoneoneone", "zizio", "zizzia"]
nomi = ["simone", "cri", "davide", "cat", "alessia"]

# Funzione per garantire un derangement (nessuno riceve la propria password)
def derange(nomi):
    while True:
        # Mischia i nomi per creare una permutazione casuale
        deranged_nomi = nomi[:]
        random.shuffle(deranged_nomi)
        
        # Verifica che nessuno riceva la propria password
        valid = True
        for i in range(len(nomi)):
            if deranged_nomi[i] == nomi[i]:  # Verifica che non riceva la propria password
                valid = False
                break
        
        if valid:
            return deranged_nomi

# Derangiamo i nomi
deranged_nomi = derange(nomi)

# Crea il dizionario finale con la struttura richiesta
regali = {}
for i in range(len(password)):
    mittente = password[i]  # Il mittente è la password
    destinatario = deranged_nomi[i]  # Il destinatario è il nome associato
    
    # Aggiungi l'elemento nel dizionario
    regali[mittente] = {
        "nome": destinatario,  # Aggiungi il nome del destinatario
        "foto": f"assets/{destinatario}.png"  # Aggiungi il link alla foto del destinatario
    }

# Converti il dizionario in formato JSON
json_output = json.dumps(regali, indent=2)

# Codifica il JSON in Base64
json_base64 = base64.b64encode(json_output.encode("utf-8")).decode("utf-8")

# Crea il JSON codificato come output
final_output = {
    "data": json_base64
}

# Converti il risultato in JSON e stampa
encoded_json_output = json.dumps(final_output, indent=2)
print(encoded_json_output)
