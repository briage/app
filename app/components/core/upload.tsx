import * as React from 'react';
import {View, Image, Text} from 'react-native';
import {Button} from 'beeshell';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';
import { request } from '../../util';
import { config } from '../../config/default';
import { styles } from '../../style/upload';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
    onSubmit: (value) => any,
    type?: 'photo' | 'video' | 'mixed',
    avatar: string,
    unAvatar?: boolean
}

function Upload(props: Props) {

    const options: ImagePickerOptions = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        quality: 1,
        videoQuality: 'high',
        allowsEditing: true,
        mediaType: props.type || 'mixed',
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '从手机相册选择',
        title: '请选择'
    }
    
    const handleImagePicker = () => {
        ImagePicker.showImagePicker(options, res => {
            if (res.uri) {
                const file = {
                    uri: res.uri,
                    type: 'multipart/form-data',
                    name: res.fileName
                }
                upload(file);
            }
        })
    }

    const upload = (file) => {
        let formData = new FormData();
        formData.append('file', file);
        fetch(`${config.proxy}/upload`, {
            method: 'POST',
            headers: {},
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                props.onSubmit(res.data);
            }
        })
    }
    return (
        props.unAvatar ? 
        <View onTouchEnd={handleImagePicker}>
            {
                props.avatar ? 
                    <Image style={styles.photo} source={{uri: props.avatar}} /> 
                :
                    <View style={styles.uploadImageWrapper}>
                        <Icon name='camera' size={30} color='#ccc' />
                        <Text style={{textAlign: 'center', fontSize: 12}}>照片</Text>
                    </View> 
            }
            
        </View>
        :
        <View style={styles.uploadWrapper} onTouchEnd={handleImagePicker}>
            <Text style={styles.title} >头像</Text>
            {
                props.avatar ? <Image style={styles.image} source={{uri: props.avatar}} /> : <Button onPress={handleImagePicker}>上传</Button>
            }
        </View>
    )
}

export { Upload };