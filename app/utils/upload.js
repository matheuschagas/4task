import Version from "./version";
import firebase from 'react-native-firebase';


let UploadService = {
    upload: async (uri:string): Promise<string> => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
            .storage
            .ref()
            .child(ImageUpload.uid());
        const snapshot = await ref.put(blob);
        return snapshot.downloadURL;
    }

};

export default UploadService;