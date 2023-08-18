import * as RNFS from "react-native-fs";
import {Platform} from "react-native";
import {onDisplayNotification} from "@/util/PushNotification";

export const downloadCopy = async (uri: string, fileName: string) => {
  const savePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
  console.log(savePath)
  if(Platform.OS === 'ios') {
    RNFS.copyAssetsFileIOS(uri, savePath, 0, 0)
      .then(res => {console.log('!')})
      .catch(err => {
        console.log('ERROR: ios')
      })
  }else if(Platform.OS === 'android') {
    RNFS.copyFile(uri, savePath)
      .then(() => {console.log('!')})
      .catch(err => {
        console.log('ERROR: android')
      })
  }

  await onDisplayNotification({title: fileName, body: '다운로드가 완료되었습니다.'});
}

export const fileDownload = async (uri: string, fileName: string) => {
  const savePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
  console.log(savePath)
  const {promise} = RNFS.downloadFile({
    fromUrl: uri,
    toFile: savePath
  })
  const {statusCode} = await promise;
  if(statusCode == 200) await onDisplayNotification({title: fileName, body: '다운로드가 완료되었습니다.'});
  else await onDisplayNotification({title: fileName, body: '다운로드를 실패했습니다.'});
}