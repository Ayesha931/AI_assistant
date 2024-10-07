from flask import Flask, request, jsonify, render_template
import os
from dotenv import load_dotenv
from groq import Groq
import markdown

# Load environment variables
load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate_response', methods=['POST'])
def generate_response():
    data = request.json
    user_choice = data.get('choice')
    user_query = data.get('query')

    prompt = generate_prompt(user_choice, user_query)

    if prompt:
        # response = get_groq_response(prompt)
        # return jsonify({'response': response})
        response = get_groq_response(prompt)
        html_response = markdown.markdown(response)  # Convert Markdown to HTML
        return jsonify({'response': html_response})  # Return HTML response
    else:
        return jsonify({'response': 'Invalid choice or query.'})

def generate_prompt(choice, user_query):
    if choice == 'coding':
        return f"You are a coding assistant. The user needs help with: '{user_query}'. Please provide code examples and explanations."
    elif choice == 'research':
        return f"You are a research assistant. The user needs help with: '{user_query}'. Provide detailed information and resources."
    return None

def get_groq_response(prompt):
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.1-70b-versatile"
    )
    return chat_completion.choices[0].message.content

if __name__ == '__main__':
    app.run(debug=True)
