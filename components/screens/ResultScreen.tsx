import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const ResultScreen = ({ result }: { result: any }) => {

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>🧾 MediBillManager</Text>
                <Text style={styles.resultsText}>Results</Text>
            </View>

            {/* Uploaded Bill Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Uploaded Bill Details</Text>
                <Text style={styles.detailText}>
                    <Text style={styles.label}>Patient Name: </Text>
                    Emma Johnson
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.label}>Date of Service: </Text>
                    2023-11-13
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.label}>Total Amount: </Text>
                    $1,250.00
                </Text>
            </View>

            {/* Errors & Explanations */}
            <View style={styles.errorSection}>
                <Text style={styles.sectionTitle}>Errors & Explanations</Text>

                <View style={styles.errorBox}>
                    <Text style={styles.errorTitle}>Error: Incorrect Date of Service</Text>
                    <Text style={styles.errorText}>The date entered does not match our records.</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Correct Date</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.errorBox}>
                    <Text style={styles.errorTitle}>Error: Missing Insurance Number</Text>
                    <Text style={styles.errorText}>Please provide the insurance number for processing.</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Add Insurance Info</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2023 MediBillManager. All rights reserved.</Text>
            </View>
        </ScrollView>
    );
};

export default ResultScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        flexGrow: 1,
    },
    header: {
        backgroundColor: "#ffffff",
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontWeight: "bold",
        fontSize: 16,
    },
    resultsText: {
        color: "#2a66b6",
        fontWeight: "600",
    },
    section: {
        backgroundColor: "#e9f0fa",
        padding: 16,
        marginTop: 16,
        borderRadius: 8,
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
    },
    detailText: {
        fontSize: 14,
        marginVertical: 2,
    },
    label: {
        fontWeight: "600",
    },
    errorSection: {
        marginTop: 20,
    },
    errorBox: {
        backgroundColor: "#f8d7da",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: "#d9534f",
    },
    errorTitle: {
        fontWeight: "bold",
        color: "#a94442",
        marginBottom: 4,
    },
    errorText: {
        color: "#a94442",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#2a66b6",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 4,
        alignSelf: "flex-start",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
    footer: {
        alignItems: "center",
        marginTop: 32,
        padding: 8,
        backgroundColor: "#d9e4f5",
        borderRadius: 4,
    },
    footerText: {
        fontSize: 12,
        color: "#666",
    },
});
