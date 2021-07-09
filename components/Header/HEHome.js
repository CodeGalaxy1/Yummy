import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, TextInput, Modal, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { GlobalStyle } from '../../styles/Global';


const BtnNext = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={GlobalStyle.BtnNext}>
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff' }}>{title}</Text>
    </TouchableOpacity>
);

export const HEHome = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [next, setNext] = useState(false);
    const [nameRecipe, setNameRecipe] = useState('');
    const [timeRecipe, setTimeRecipe] = useState('');
    const [infoRecipe, setInfoRecipe] = useState('');

    const toggleEditing = () => {
        setNext(!next);
    };

    const inputRef = useRef();

    useEffect(() => {
        if (next) {
            inputRef.current.focus();
        }
    }, [next]);

    return (
        <View style={GlobalStyle.headerHomePage}>
            
            <Modal visible={modalOpen} animationType='slide'>
                <Header
                    centerComponent={{ text: 'My Recipe', style: { color: '#000', fontSize: 30, fontWeight: '700' } }}
                    rightComponent=
                    {{
                        icon: 'close', color: '#000', style: {
                            justifyContent: 'center', alignItems: 'center',
                            width: 40, height: 40, borderRadius: 40, backgroundColor: '#e4e6eb'
                        }, onPress: () => setModalOpen(false)
                    }}
                    containerStyle={{
                        width: '100%',
                        paddingHorizontal: 16,
                        marginVertical: 40,
                        backgroundColor: 'transparent',
                        justifyContent: 'space-around',
                    }}
                />
                <View style={GlobalStyle.modalContent}>
                    <View style={GlobalStyle.togetherAction}>
                        <View>
                            <Text style={{ fontSize: 26, fontWeight: '500', marginBottom: 10 }}>Add Your Recipe,</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500' }}>Choose your image</Text>
                        </View>
                        <View style={GlobalStyle.imgRecipe}></View>
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>Details</Text>
                    <TextInput placeholder="Name of Recipe" style={GlobalStyle.inputRecipe} value={nameRecipe} onChange={e => setNameRecipe(e.target.value)} />
                    <TextInput placeholder="Time(Around)" style={GlobalStyle.inputRecipe} value={timeRecipe} onChange={e => setTimeRecipe(e.target.value)} />
                </View>
                <View style={GlobalStyle.btnEffect}>
                    <BtnNext
                        onPress={toggleEditing}
                        style={GlobalStyle.BtnNext}
                        title="Next"
                        color="#dc143c"
                    />
                </View>
            </Modal>

            { next && <Modal visible={next} ref={inputRef} animationType='fade'>
                <Header
                    leftComponent=
                    {{ 
                        icon: 'west', color: '#000', style: {
                            justifyContent: 'center', alignItems: 'center',
                            width: 40, height: 40, borderRadius: 40, 
                            backgroundColor: '#e4e6eb',
                        }, onPress: () => setModalOpen(true)
                    }}
                    centerComponent={{ text: 'Ingredients', style: { color: '#000', fontSize: 30, fontWeight: '700' } }}
                    rightComponent=
                    {{
                        icon: 'check', color: '#fff', style: {
                            justifyContent: 'center', alignItems: 'center',
                            width: 40, height: 40, borderRadius: 40, 
                            backgroundColor: '#00e58f', borderWidth: 1, 
                            borderColor: 'green',
                        }, onPress: () => setModalOpen(false)
                    }}
                    containerStyle={{
                        width: '100%',
                        paddingHorizontal: 16,
                        marginVertical: 40,
                        backgroundColor: 'transparent',
                        justifyContent: 'space-around',
                    }}
                />
                <View style={GlobalStyle.modalContent}>
                    <View style={GlobalStyle.textAreaContainer}>
                        <TextInput
                            value={infoRecipe}
                            onChange={e => setInfoRecipe(e.target.value)}
                            style={GlobalStyle.textArea}
                            underlineColorAndroid="transparent"
                            placeholder="Ingredients and preparation..."
                            numberOfLines={10}
                            multiline={true}
                        />
                    </View>
                </View>
            </Modal>}

            <Text style={{ fontSize: 30, fontWeight: '700', color: '#000' }}>Yummy</Text>
            <View style={GlobalStyle.fakeIconBox}>
                <AntDesign name="plus" size={22} color='#141414' onPress={() => setModalOpen(true)} />
            </View>
        </View>
    );
}

{/* <View style={GlobalStyle.textAreaContainer}>
<TextInput
    value={infoRecipe} 
    onChange={e => setInfoRecipe(e.target.value)}
    style={GlobalStyle.textArea}
    underlineColorAndroid="transparent"
    placeholder="Ingredients and preparation..."
    numberOfLines={10}
    multiline={true}
/>
</View> */}