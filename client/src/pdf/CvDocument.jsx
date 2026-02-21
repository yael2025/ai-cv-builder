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
})

function CvDocument({cv}) {

    return(

        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header  */}
                <View style={styles.section}>
                    <Text style={styles.header}>{cv.personal.fullName}</Text>
                    <Text style={styles.muted}>{cv.personal.email}</Text>
                    <Text style={styles.muted}>{cv.personal.phone}</Text>
                    <Text style={styles.muted}>{cv.personal.location}</Text>
                    <Text style={styles.muted}>{cv.personal.linkedin}</Text>
                </View>
                {/* Summary */}
                {cv.summary && (
                <View style={styles.section}>
                    <Text style={styles.subHeader}>Summary</Text>
                    <Text>{cv.summary}</Text>
                </View>
                )}
                {/* Skills */}
                {cv.skills.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subHeader}>Skills</Text>
                    <Text>{cv.skills.join(" • ")}</Text>
                </View>
                )}

                 {/* Experience */}
                 {cv.experiences.length>0 && (
                    <View style={styles.section}>
                        <Text style={styles.subHeader}>Experience</Text>
                        {cv.experiences.map((exp, index) => (
                        <View key={index} style={styles.item}>
                            <Text>
                            {exp.role} - {exp.company}
                            </Text>
                            <Text style={styles.muted}>
                            {exp.startDate} - {exp.endDate}
                            </Text>
                            <Text>{exp.description}</Text>
                        </View>
                        ))}
                    </View>
                    )}
                    
                    {/* Education */}
                    {cv.education.length > 0 && (
                        <View style={styles.section}>
                        <Text style={styles.subHeader}>Education</Text>
                        {cv.education.map((edu, index) => (
                            <View key={index} style={styles.item}>
                            <Text>
                                {edu.degree} - {edu.school}
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