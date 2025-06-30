import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
};

type QuestionAnswer = {
    question: string;
    answer: string;
};

// Typing indicator component
const TypingIndicator = () => {
    const [dot1] = useState(new Animated.Value(0));
    const [dot2] = useState(new Animated.Value(0));
    const [dot3] = useState(new Animated.Value(0));

    useEffect(() => {
        const animateDots = () => {
            const duration = 600;
            const delay = 200;

            Animated.loop(
                Animated.sequence([
                    Animated.timing(dot1, { toValue: 1, duration: duration / 2, useNativeDriver: true }),
                    Animated.timing(dot1, { toValue: 0, duration: duration / 2, useNativeDriver: true }),
                ])
            ).start();

            setTimeout(() => {
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(dot2, { toValue: 1, duration: duration / 2, useNativeDriver: true }),
                        Animated.timing(dot2, { toValue: 0, duration: duration / 2, useNativeDriver: true }),
                    ])
                ).start();
            }, delay);

            setTimeout(() => {
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(dot3, { toValue: 1, duration: duration / 2, useNativeDriver: true }),
                        Animated.timing(dot3, { toValue: 0, duration: duration / 2, useNativeDriver: true }),
                    ])
                ).start();
            }, delay * 2);
        };

        animateDots();
    }, []);

    return (
        <View
            style={{
                alignSelf: 'flex-start',
                backgroundColor: '#EAEAEA',
                marginVertical: 5,
                padding: 15,
                borderRadius: 16,
                maxWidth: '75%',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Text style={{ fontSize: 16, marginRight: 5 }}>Analyzing your query</Text>
            {[dot1, dot2, dot3].map((dot, index) => (
                <Animated.View
                    key={index}
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#666',
                        marginHorizontal: 1,
                        opacity: dot,
                    }}
                />
            ))}
        </View>
    );
};

export default function ChatScreen({ data }: { data: any }) {
    console.log(`🚀 ~ ChatScreen.tsx:22 ~ ChatScreen ~ data:`, data.uploadData)
    const uniqueCodeTypes = Array.from(
        new Set(data?.uploadData?.map((item: any) => item.code_type))
    );
    const firstMessage = `✅ We've received your information. Here are the extracted code types:\n\n${uniqueCodeTypes
        .map((type, idx) => `${idx + 1}. ${type}`)
        .join('\n')}
What do you want to know about?`;

    // Predefined questions and answers based on medical codes
    const questionSuggestions: QuestionAnswer[] = [
        {
            question: "What is cell enumeration?",
            answer: "Cell enumeration (DHS Code 86152/86153) is a process to count the number of cells in a sample. It's often used to assess cell growth, health, or to diagnose diseases. This technique helps understand cell populations and their behavior in medical research."
        },
        {
            question: "Explain autologous blood procedures",
            answer: "Autologous blood procedures (DHS Codes 86890/86891) involve using a person's own blood for medical purposes. This includes donating your own blood for future transfusions or surgeries, and blood salvage during operations where your blood is collected, processed, and reinfused to reduce the need for external transfusions."
        },
        {
            question: "What is fresh frozen plasma?",
            answer: "Fresh frozen plasma (DHS Code 86927) is blood plasma that has been collected, processed, and frozen for later use. It's commonly used for transfusions or medical research and contains important clotting factors and proteins."
        },
        {
            question: "How does frozen blood preparation work?",
            answer: "Frozen blood preparation (DHS Codes 86930/86931) involves cooling blood to preserve it for transfusions, ensuring safety and viability. The thawing process carefully warms previously stored blood to restore its fluidity and usability while maintaining safety for patients."
        },
        {
            question: "What are the benefits of autologous blood salvage?",
            answer: "Autologous blood salvage reduces the risk of blood-borne infections, eliminates compatibility issues, and decreases the demand on blood banks. It's particularly useful during surgeries with expected blood loss."
        },
        {
            question: "When is cell enumeration typically performed?",
            answer: "Cell enumeration is typically performed in diagnostic testing, cancer monitoring, immune system evaluation, research studies, and quality control in cell culture laboratories."
        }
    ];

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: firstMessage, sender: 'bot' },
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const { bottom } = useSafeAreaInsets();

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
        };
        setMessages((prev) => [...prev, newMessage]);
        setInputText('');
    };

    const handleQuestionSuggestion = (qa: QuestionAnswer) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text: qa.question,
            sender: 'user',
        };

        // Add user message immediately
        setMessages((prev) => [...prev, userMessage]);

        // Show typing indicator
        setIsTyping(true);

        // Add bot response after delay
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: qa.answer,
                sender: 'bot',
            };

            setIsTyping(false);
            setMessages((prev) => [...prev, botMessage]);
        }, 2000); // 1.5 second delay
    };

    const renderItem = ({ item }: { item: Message }) => (
        <View
            style={{
                alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: item.sender === 'user' ? '#DCF8C6' : '#EAEAEA',
                marginVertical: 5,
                padding: 10,
                borderRadius: 16,
                maxWidth: '75%',
            }}
        >
            <Text style={{ fontSize: 16 }}>{item.text}</Text>
        </View>
    );

    const renderQuestionSuggestion = (qa: QuestionAnswer, index: number) => (
        <TouchableOpacity
            key={index}
            style={{
                backgroundColor: '#F0F8FF',
                borderColor: '#007AFF',
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 8,
                marginRight: 8,
                marginBottom: 8,
            }}
            onPress={() => handleQuestionSuggestion(qa)}
        >
            <Text style={{ color: '#007AFF', fontSize: 14 }}>{qa.question}</Text>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : bottom}
        >
            <View style={{ flex: 1 }}>
                <FlatList
                    data={[...messages].reverse()}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        padding: 10,
                        paddingBottom: 20,
                        flexGrow: 1,
                        justifyContent: 'flex-end',
                    }}
                    inverted
                    ListHeaderComponent={isTyping ? <TypingIndicator /> : null}
                />

                {/* Question Suggestions */}
                <View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexDirection: 'row', }}
                    >
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            {questionSuggestions.map((qa, index) => renderQuestionSuggestion(qa, index))}
                        </View>
                    </ScrollView>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            backgroundColor: '#eee',
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            borderRadius: 25,
                            fontSize: 16,
                        }}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type a message"
                        editable={!isTyping} // Disable input while bot is typing
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        style={{
                            marginLeft: 10,
                            opacity: isTyping ? 0.5 : 1
                        }}
                        disabled={isTyping}
                    >
                        <Ionicons name="send" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
