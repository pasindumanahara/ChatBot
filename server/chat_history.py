def write_file(user, text):
    with open("logs.txt", "a", encoding="utf-8") as file:
        if user == "user":
            file.write("User: " + text + "\n")
        else:
            file.write("Bot: " + text + "\n")