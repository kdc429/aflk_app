import {StyleSheet} from "react-native";

export const CommonStyles = StyleSheet.create({
  default_app: {},
  default_color: {color: '#f18a1c'},
  default_border: {borderColor: '#f18a1c', borderWidth: 1},
  /* Padding */
  pd10: {padding: 10},
  pd15: {padding: 15},
  pd20: {padding: 20},

  pdv5: {paddingVertical: 5},
  pdv10: {paddingVertical: 10},
  pdv15: {paddingVertical: 15},
  pdv20: {paddingVertical: 20},

  /* margin */
  mg10: {margin: 10},
  mg15: {margin: 15},
  mg20: {margin: 20},

  mgt5: {marginTop: 5},
  mgt10: {marginTop: 10},
  mgt15: {marginTop: 15},
  mgt20: {marginTop: 20},

  mgb10: {marginBottom: 10},
  mgb15: {marginBottom: 15},
  mgb20: {marginBottom: 20},

  mgh10: {marginHorizontal: 10},
  mgh15: {marginHorizontal: 15},
  mgh20: {marginHorizontal: 20},

  /* width */
  w30: {width: '30%'},
  w35: {width: '35%'},
  w40: {width: '40%'},
  w45: {width: '45%'},
  w50: {width: '50%'},
  w80: {width: '80%'},
  w90: {width: '90%'},
  w95: {width: '95%'},
  w100: {width: '100%'},

  inner_wrap: {margin: 10, borderRadius: 10, minHeight: '98.5%'},
  flex_row: {flexDirection: 'row', width: '100%'},
  jc_end: {justifyContent: "flex-end"},
  jc_center: {justifyContent: "center", alignItems: 'center'},
  jc_start: {justifyContent: "flex-start"},
  jc_space: {justifyContent: "space-around"},
  jc_between: {justifyContent: "space-between"},
  text_bold: {fontWeight: 'bold'},
  box_shadow0: {backgroundColor: '#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 1,}, shadowOpacity: 0.18, shadowRadius: 1.00, elevation: 1,},
  box_shadow1: {backgroundColor: '#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 1,}, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2,},
  box_shadow2: {backgroundColor: '#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 1,}, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3,},
  box_shadow3: {backgroundColor: '#fff', shadowColor: "#000", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4,},
  box_shadow4: {backgroundColor: '#fff', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,},

  /* modal */
  modal_backdrop: {width: '100%', height: '100%', position: 'absolute', zIndex: 10, top: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)'}
})