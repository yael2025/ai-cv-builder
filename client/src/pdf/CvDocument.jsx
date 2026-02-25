import React from "react";

import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer"

const styles = StyleSheet.create({
     page:{
        padding:40,
        fontSize:12,
        fontFamily: "Helvetica"
     },
     section:{
        marginBottom:15
     },
     header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
     },
     subHeader: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5
     },
     muted: {
        color: "gray",
        marginBottom: 3
     },
     muted: {
        color: "gray",
        marginBottom: 3
     },
     blueLine: {
        height: 2,
        backgroundColor: "#2c5aa0",
        marginBottom: 10
      },
})

function CvDocument({cv}) {

    return(

        <Document>
           <Page size="A4" style={styles.page}>

            {/* Header */}
            <Text style={styles.header}>{cv.personal.fullName}</Text>
            <Text style={styles.contact}>
            {cv.personal.email} | {cv.personal.phone}
            </Text>
            <Text style={styles.contact}>
            {cv.personal.location} | {cv.personal.linkedin}
            </Text>

            {/* SUMMARY */}
            {cv.summary && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>SUMMARY</Text>
                <View style={styles.blueLine} />
                <Text>{cv.summary}</Text>
            </View>
            )}

            {/* SKILLS */}
            {cv.skills.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>SKILLS</Text>
                <View style={styles.blueLine} />
                {cv.skills.map((skill, i) => (
                <Text key={i}>• {skill}</Text>
                ))}
            </View>
            )}

            {/* EXPERIENCE */}
            {cv.experiences.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                <View style={styles.blueLine} />
                {cv.experiences.map((exp, i) => (
                <View key={i} style={styles.item}>
                    <Text>
                    {exp.role} – {exp.company}
                    </Text>
                    <Text style={styles.muted}>
                    {exp.startDate} - {exp.endDate}
                    </Text>
                    <Text>{exp.description}</Text>
                </View>
                ))}
            </View>
            )}

            {/* EDUCATION */}
            {cv.education.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>EDUCATION</Text>
                <View style={styles.blueLine} />
                {cv.education.map((edu, i) => (
                <View key={i} style={styles.item}>
                    <Text>
                    {edu.degree} – {edu.school}
                    </Text>
                    <Text style={styles.muted}>
                    {edu.startYear} - {edu.endYear}
                    </Text>
                </View>
                ))}
            </View>
            )}

            </Page>
        </Document>
    ) 
}

export default CvDocument