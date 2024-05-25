import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Fonts, Sizes } from '../constants/styles';
import { firestore } from './firebase';
import { collection, getDocs, query, where, updateDoc, arrayUnion, doc } from 'firebase/firestore';

const TestReports = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState("");
    const [BAI, setBAI] = useState([]);
    const [BDI, setBDI] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const getUserEmail = async () => {
            const fetchUserTests = async (userEmail) => {
                const userDataCollection = collection(firestore, 'userdata');
    
                try {
                    const querySnapshot = await getDocs(
                        query(userDataCollection, where('emailId', '==', userEmail)),
                    );
    
                    const docId = querySnapshot.docs[0].id;
    
                    const docData = querySnapshot.docs[0].data();
    
                    const currentBAI = docData.BAI || [];
                    setBAI(currentBAI)
                    const currentBDI = docData.BDI || [];
                    setBDI(currentBDI)
                    setIsLoading(false); // Set loading to false when data is fetched
                } catch (error) {
                    console.error('Error uploading total score to Firestore:', error);
                    setIsLoading(false); // Set loading to false in case of error
                }
            }
            try {
                const user = await AsyncStorage.getItem('emailS');
                const storedUserEmail = await AsyncStorage.getItem(`userEmail_${user}`);
                const userEmail = storedUserEmail.replace(/[\[\]"]+/g, '');
    
                fetchUserTests(userEmail);
            } catch (error) {
                console.error('Error retrieving user email from AsyncStorage:', error);
                setIsLoading(false); // Set loading to false in case of error
            }
        };

        getUserEmail();
    }, []);

    const renderTestItem = ({ item }) => {
        const validity = calculateValidity(item.date);
        const { type, color } = calculateTypeBAI(item.score);
        return (
            <View style={styles.testItemContainer}>
                <Text style={[styles.testItemText, { color }]}>{item.score}</Text>
                <Text style={styles.testItemText}>{item.date.toDate().toLocaleDateString()}</Text>
                <Text style={styles.testItemText}>{validity}</Text>
                <Text style={[styles.testItemText, { color,fontWeight:'bold' }]}>{type}</Text>
            </View>
        );
    };
    const renderTestItem2 = ({ item }) => {
        const validity = calculateValidity(item.date);
        const { type, color } = calculateTypeBDI(item.score);
        return (
            <View style={styles.testItemContainer}>
                <Text style={[styles.testItemText, { color }]}>{item.score}</Text>
                <Text style={styles.testItemText}>{item.date.toDate().toLocaleDateString()}</Text>
                <Text style={styles.testItemText}>{validity}</Text>
                <Text style={[styles.testItemText, { color,fontWeight:'bold' }]}>{type}</Text>
            </View>
        );
    };

    const calculateValidity = (testDate) => {
        const currentDate = new Date();
        const differenceInDays = Math.floor((currentDate - testDate.toDate()) / (1000 * 60 * 60 * 24));
        return 7 - differenceInDays;
    };

    const calculateTypeBDI = (score) => {
        if (score >= 0 && score <= 10) {
            return { type: "Normal", color: 'green' };
        } else if (score >= 11 && score <= 16) {
            return { type: "Mild Disturbance", color: 'brown' };
        } else if (score >= 17 && score <= 20) {
            return { type: "Borderline Clinical", color: 'orange' };
        } else if (score >= 21 && score <= 30) {
            return { type: "Moderate", color: 'orange' };
        } else if (score >= 31 && score <= 40) {
            return { type: "Severe", color: 'red' };
        } else {
            return { type: "Extreme", color: 'red' };
        }
    };
    const calculateTypeBAI = (score) => {
        if (score >= 0 && score <= 21) return { type: 'Low', color: 'green' };
        else if (score >= 22 && score <= 35) return { type: 'Moderate', color:'orange' };
        else if (score >= 36) return { type: 'High', color:'red' };
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Test Reports</Text>

            <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>BAI (Anxiety Test Reports)</Text>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Score</Text>
                    <Text style={styles.headerText}>Date</Text>
                    <Text style={styles.headerText}>Validity (days)</Text>
                    <Text style={styles.headerText}>Type</Text>
                </View>
                <FlatList
                    data={BAI}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderTestItem}
                />
            </View>

            <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>BDI (Depression Test Reports)</Text>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Score</Text>
                    <Text style={styles.headerText}>Date</Text>
                    <Text style={styles.headerText}>Validity (days)</Text>
                    <Text style={styles.headerText}>Type</Text>
                </View>
                <FlatList
                    data={BDI}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderTestItem2}
                />
            </View>
            <View>
                <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.submitButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding,
        justifyContent: "space-between"
    },
    title: {
        ...Fonts.primaryColor20Bold,
        marginBottom: Sizes.fixPadding,
        textAlign: 'center',
    },
    tableContainer: {
        marginBottom: Sizes.fixPadding,
        borderWidth: 1,
        borderColor: Colors.lightGrayColor,
        borderRadius: 10,
        padding: Sizes.fixPadding,
    },
    tableTitle: {
        ...Fonts.primaryColor16Bold,
        marginBottom: Sizes.fixPadding,
        textAlign: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrayColor,
        paddingBottom: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    headerText: {
        ...Fonts.grayColor16Regular,
        flex: 1,
        textAlign: 'center',
    },
    testItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrayColor,
        paddingBottom: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    testItemText: {
        ...Fonts.grayColor16Regular,
        flex: 1,
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 150
    },
    submitButtonText: {
        ...Fonts.whiteColor16Medium,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TestReports;
