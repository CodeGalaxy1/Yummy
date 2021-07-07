import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffc371',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  HeadText: {
    marginBottom: 50,
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  input:{
    alignSelf:"center",
    borderColor:'#777',
    padding:15,
    margin:10,
    width:300,
    textAlign:"left",
    borderRadius: 4,
    borderWidth: 1
  },
  appButtonContainer: {
    width:300,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    padding :50,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  box:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height:"100%",
    width:"100%",
  },HeadTextRegister:{
    fontStyle: "italic",
    fontSize: 20,
    textAlign: "center",

    fontFamily: 'sans-serif'

    
  },

});
