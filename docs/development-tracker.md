# T-Level Chat Bot Development Tracker

## Project goal
Build a web app centred around a T-Level advice chatbot. The chatbot should provide clear information about T-Levels, help users understand who they are for, compare them with other routes, and answer common questions using curated T-Level information.

## Core product idea
- A web app with a central chat interface
- A chatbot that answers questions about T-Levels
- Advice based on structured educational information
- Clear, accessible UI for students and parents
- Focus on usefulness, clarity, and quick decision support

## Project objectives
- Help students and parents understand T-Levels
- Explain what T-Levels are, who they are for, and how they differ from A-Levels/apprenticeships
- Provide practical advice based on a knowledge base
- Keep the project simple and realistic under deadline pressure

## Questions that still need understanding
- What exact T-Level topics need to be covered?
- Which sources should be treated as the trusted knowledge base?
- Do we want a simple rule-based chatbot first, or a more advanced RAG-style approach?
- What does the ideal user journey look like?
- Do we need a triage/decision support element in addition to the chatbot?

## Required development tasks
### 1. Project setup
- Confirm app structure
- Set up backend environment
- Set up frontend structure
- Create required folders and config files

### 2. Knowledge base creation
- Gather relevant information about T-Levels
- Organise into structured content for the chatbot
- Ensure data is accurate, simple, and readable
- Create a base prompt or response library

### 3. Backend development
- Create FastAPI app
- Build chat endpoint
- Connect question input to knowledge retrieval
- Return clear responses

### 4. Frontend development
- Build the chat window UI
- Add quick suggestion buttons
- Style the app for a clean user experience
- Connect frontend form to backend API

### 5. Testing and validation
- Test normal questions
- Test edge cases and vague queries
- Check response quality
- Validate that the app works locally

### 6. Report and documentation
- Write the technical report sections
- Explain the architecture and development process
- Include testing evidence
- Include critical evaluation and reflection

## Planned app features
- Chat input field
- Suggested prompts
- Chat history in the UI
- Clear answer formatting
- Short, friendly guidance responses
- Strong educational but concise explanations

## MVP scope for now
- Chatbot as the main feature
- Information about T-Levels in the app
- Simple question-answer interaction
- No login or user accounts
- No persistent database required for initial build

## Functional requirements
- User can submit a question about T-Levels
- App returns a helpful, relevant answer
- App is easy to use on desktop and mobile
- Data is in a structured, maintainable format
- Responses are understandable for school-age users and parents

## Non-functional requirements
- Simple and lightweight backend
- Fast response times
- Clean and accessible user interface
- Easy to extend later if needed

## Suggested test cases
### Basic functionality
1. User asks: "What are T-Levels?"
2. User asks: "How do T-Levels compare with A-Levels?"
3. User asks: "Are T-Levels good for me?"
4. User asks: "What jobs can T-Levels lead to?"
5. User asks: "What is an industry placement?"

### Edge cases
6. User enters a blank message
7. User asks a vague or unrelated question
8. User asks a question with spelling mistakes
9. User asks a question in lowercase or mixed case
10. User asks for information about apprenticeships or other pathways

## Risks to monitor
- Knowledge base may be too small or too vague
- Responses may be too generic
- The app may look basic if time is limited
- The project may risk being too broad if extra features are added

## Success criteria
- The chatbot answers common T-Level questions confidently and clearly
- The UI is easy to understand and use
- The app is working locally and can be demonstrated
- The design and implementation support the assignment brief

## Notes for the next development phase
The next step is to build the simple app structure, define the data format for the chatbot, and create the backend/frontend shells so the project can start taking shape.
