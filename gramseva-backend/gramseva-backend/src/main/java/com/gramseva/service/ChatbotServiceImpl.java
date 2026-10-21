package com.gramseva.service;

import org.springframework.stereotype.Service;

@Service
public class ChatbotServiceImpl implements ChatbotService {

    @Override
    public String getResponse(String message) {

        // =====================================================
        // EMPTY MESSAGE
        // =====================================================

        if (message == null || message.trim().isEmpty()) {

            return "Please type your question. 🌿 I am here to help you.";
        }


        // =====================================================
        // NORMALIZE MESSAGE
        // =====================================================

        String query = message
                .toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9]", " ")
                .replaceAll("\\s+", " ");


        System.out.println("CHATBOT QUESTION: " + message);
        System.out.println("CHATBOT QUERY: " + query);


        // =====================================================
        // GREETING
        // =====================================================

        if (
                query.contains("hello") ||
                        query.contains("hi") ||
                        query.contains("hey") ||
                        query.contains("namaste") ||
                        query.contains("good morning") ||
                        query.contains("good afternoon") ||
                        query.contains("good evening")
        ) {

            return "Namaste! 🌿 I am GramSeva AI.\n\n"
                    + "How can I help you today?";
        }


        // =====================================================
        // BIRTH CERTIFICATE
        // =====================================================

        if (
                query.contains("birth certificate") ||
                        query.contains("birth registration") ||
                        query.contains("birth certificate apply") ||
                        query.contains("apply birth") ||
                        query.contains("apply for birth") ||
                        query.contains("birth document") ||
                        query.contains("birth proof") ||
                        query.contains("newborn certificate") ||
                        query.contains("born certificate")
        ) {

            return "Yes! 🌿 You can apply for a Birth Certificate through GramSeva AI.\n\n"
                    + "📋 Steps to apply:\n\n"
                    + "1️⃣ Login using your Village ID.\n"
                    + "2️⃣ Open the Services section.\n"
                    + "3️⃣ Select Birth Certificate.\n"
                    + "4️⃣ Enter the required details.\n"
                    + "5️⃣ Upload the required documents.\n"
                    + "6️⃣ Submit your application.\n\n"
                    + "✅ After submission, you can track your application status from your dashboard.";
        }


        // =====================================================
        // INCOME CERTIFICATE
        // =====================================================

        if (
                query.contains("income certificate") ||
                        query.contains("income proof") ||
                        query.contains("apply income") ||
                        query.contains("income document")
        ) {

            return "Yes! 🌿 You can apply for an Income Certificate through GramSeva AI.\n\n"
                    + "📋 Steps:\n\n"
                    + "1️⃣ Login using your Village ID.\n"
                    + "2️⃣ Open Services.\n"
                    + "3️⃣ Select Income Certificate.\n"
                    + "4️⃣ Enter the required information.\n"
                    + "5️⃣ Upload the required documents.\n"
                    + "6️⃣ Submit the application.\n\n"
                    + "✅ You can track your application from your dashboard.";
        }


        // =====================================================
        // COMPLAINT / GRIEVANCE
        // =====================================================

        if (
                query.contains("complaint") ||
                        query.contains("complaints") ||
                        query.contains("grievance") ||
                        query.contains("problem") ||
                        query.contains("issue") ||
                        query.contains("report issue") ||
                        query.contains("register complaint")
        ) {

            return "You can register a complaint through GramSeva AI. 📝\n\n"
                    + "📋 Steps:\n\n"
                    + "1️⃣ Login using your Village ID.\n"
                    + "2️⃣ Open the Complaints section.\n"
                    + "3️⃣ Enter your complaint details.\n"
                    + "4️⃣ Upload a photo if required.\n"
                    + "5️⃣ Submit the complaint.\n\n"
                    + "🤖 GramSeva AI can categorize your complaint and help you track its status.";
        }


        // =====================================================
        // GOVERNMENT SCHEMES
        // =====================================================

        if (
                query.contains("scheme") ||
                        query.contains("schemes") ||
                        query.contains("government scheme") ||
                        query.contains("yojana") ||
                        query.contains("government benefit") ||
                        query.contains("government scheme")
        ) {

            return "🏛️ GramSeva AI can help you explore government schemes.\n\n"
                    + "You can check schemes based on your eligibility, category and requirements.\n\n"
                    + "👉 Open the Government Schemes section from the home page to explore available schemes.";
        }


        // =====================================================
        // TAX
        // =====================================================

        if (
                query.contains("tax") ||
                        query.contains("property tax") ||
                        query.contains("house tax") ||
                        query.contains("home tax")
        ) {

            return "💰 You can access local and property tax services through GramSeva AI.\n\n"
                    + "Login using your Village ID and open the Tax section to view your details and available payment options.";
        }


        // =====================================================
        // LOGIN
        // =====================================================

        if (
                query.contains("login") ||
                        query.contains("log in") ||
                        query.contains("sign in") ||
                        query.contains("village id") ||
                        query.contains("password")
        ) {

            return "🔐 To login to GramSeva AI:\n\n"
                    + "1️⃣ Open the Login page.\n"
                    + "2️⃣ Enter your Village ID.\n"
                    + "3️⃣ Enter your password.\n"
                    + "4️⃣ Click Login.\n\n"
                    + "If you are a new citizen, please register first to receive your Village ID.";
        }


        // =====================================================
        // REGISTRATION
        // =====================================================

        if (
                query.contains("register") ||
                        query.contains("registration") ||
                        query.contains("create account") ||
                        query.contains("new account") ||
                        query.contains("sign up") ||
                        query.contains("signup")
        ) {

            return "🌿 To create your GramSeva AI account:\n\n"
                    + "1️⃣ Click the Register button on the home page.\n"
                    + "2️⃣ Complete Aadhaar verification.\n"
                    + "3️⃣ Enter your personal details.\n"
                    + "4️⃣ Create your password.\n"
                    + "5️⃣ Submit the registration form.\n\n"
                    + "✅ After successful registration, your Village ID will be generated.";
        }


        // =====================================================
        // APPLICATION STATUS
        // =====================================================

        if (
                query.contains("application status") ||
                        query.contains("status of application") ||
                        query.contains("track application") ||
                        query.contains("track my application")
        ) {

            return "📋 You can track your application status from your GramSeva AI dashboard.\n\n"
                    + "Login using your Village ID and open the relevant service section to check your application.";
        }


        // =====================================================
        // DOCUMENTS
        // =====================================================

        if (
                query.contains("document") ||
                        query.contains("documents") ||
                        query.contains("required documents") ||
                        query.contains("what documents")
        ) {

            return "📄 The required documents depend on the service you are applying for.\n\n"
                    + "You can select a service such as Birth Certificate or Income Certificate to see the required documents.";
        }


        // =====================================================
        // THANK YOU
        // =====================================================

        if (
                query.contains("thank you") ||
                        query.contains("thanks") ||
                        query.contains("thank")
        ) {

            return "You're welcome! 🌿\n\n"
                    + "I am always happy to help you with GramSeva services.";
        }


        // =====================================================
        // BYE
        // =====================================================

        if (
                query.contains("bye") ||
                        query.contains("goodbye")
        ) {

            return "Thank you for using GramSeva AI. 🌿\n\n"
                    + "Have a great day!";
        }


        // =====================================================
        // DEFAULT RESPONSE
        // =====================================================

        return "I'm sorry, I couldn't understand your question yet. 🤖\n\n"
                + "You can ask me about:\n\n"
                + "📜 Birth Certificate\n"
                + "💰 Income Certificate\n"
                + "📝 Complaints\n"
                + "🏛️ Government Schemes\n"
                + "💵 Taxes\n"
                + "🔐 Login\n"
                + "🌿 Registration\n"
                + "📋 Application Status\n\n"
                + "For example:\n"
                + "\"How can I apply for a birth certificate?\"";
    }
}