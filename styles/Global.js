import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  //----- Titles -----
  //start page
  innerBox: {
    padding: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  boxLanding: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",

  },
  //login content container
  box: {
    flex: 1,
    backgroundColor: "#e6f7ff",
  },
  //login inputs with icons designs
  inputIcon: {
    alignSelf: "center",
    borderColor: "#777",
    padding: 15,
    width: 300,
    textAlign: "left",
    borderRadius: 4,
  },
  icon: {
    paddingTop: 20,
    paddingLeft: 10,
    fontSize: 20,
  },
  IconInputContainer: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "center",
    borderColor: "#777",
    margin: 10,
    width: 300,
    textAlign: "left",
    borderRadius: 4,
    borderWidth: 1,
  },

  //---inputs---
  input: {
    alignSelf: "center",
    borderColor: "#777",
    padding: 15,
    margin: 10,
    width: 300,
    textAlign: "left",
    borderRadius: 4,
    borderWidth: 1,
  },
  //---button designs---
  appButtonContainer: {
    width: 300,
    elevation: 8,
    backgroundColor: "#0099e6",
    borderRadius: 10,
    padding: 15,
    marginLeft: 40,
  },
  appBtnContainer: {
    width: 300,
    elevation: 8,
    backgroundColor: "#0099e6",
    borderRadius: 10,
    padding: 15,
  },

  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    alignSelf: "center",
  },
  //Register page header
  HeadTextRegister: {
    fontStyle: "italic",
    fontSize: 20,
    textAlign: "center",
    marginTop: 200,
  },
  //text with link design
  textWithLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  //profile page
  profileHeader: {
    flexDirection: "row",
    alignSelf: "center",
    margin: 10,
    textAlign: "left",
  },
  //icons desing (like/dislike)
  image: {
    marginTop: 10,
    width: 40
    , height: 40
  }
});
