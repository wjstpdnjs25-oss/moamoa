import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";



export default function BudgetScreen() {
    const [food, setFood] = useState("");
    const [transport, setTransport] = useState("");
    const [shopping, setShopping] = useState("");
    const [cafe, setCafe] = useState("");
    const totalBudget =
    Number(food || 0) +
    Number(transport || 0) +
    Number(shopping || 0) +
    Number(cafe || 0);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>예산 설정</Text>


      <View style={styles.card}>
        <Text style={styles.label}>카테고리별 예산</Text>

        <TextInput 
        placeholder="식비" 
        style={styles.input}
        keyboardType="numeric"
        value={food}
        onChangeText={setFood}
         />
        <TextInput 
        placeholder="교통" 
        style={styles.input} 
        keyboardType="numeric"
        value={transport}
        onChangeText={setTransport}
        />
        <TextInput 
        placeholder="쇼핑" 
        style={styles.input} 
        keyboardType="numeric"
        value={shopping}
        onChangeText={setShopping}
        />
        <TextInput 
        placeholder="카페" 
        style={styles.input} 
        keyboardType="numeric"
        value={cafe}
        onChangeText={setCafe}/>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>총 예산</Text>

         <Text style={styles.totalBudgetText}>
         ₩ {totalBudget.toLocaleString()}
     </Text>
    </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
    padding: 22,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20,
    color: "#111111",
  },

  card: {
    backgroundColor: "#EEF0FF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: "#DDE2FF",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#3D5AFE",
    fontWeight: "700",
    fontSize: 16,
  },
  
totalBudgetText: {
  fontSize: 28,
  fontWeight: "700",
  color: "#111111",
  marginTop: 8,
},
});