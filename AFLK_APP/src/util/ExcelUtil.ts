import moment from "moment";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import {useUserState} from "@/contexts/user/UserContext";
import * as RNFS from "react-native-fs";

let common_style = {
  font  : {bold: "true"}, alignment: {horizontal: 'center'},
  border: {top: {style: 'thin'}, bottom: {style: 'thin'}, left: {style: 'thin'}, right: {style: 'thin'}},
  fill: { fgColor: { rgb: "E9E9E9" } }
};

const excelHeaders = [
  [
    { v: "번호", t: "s", s: common_style,  }, { v: "MCODE", t: "s", s: common_style },{ v: "TID", t: "s", s: common_style },
    { v: "가맹점", t: "s", s: common_style }, { v: "구분", t: "s", s: common_style }, { v: "PG사", t: "s", s: common_style }, { v: "결제구분", t: "s", s: common_style },
    { v: "승인번호", t: "s", s: common_style }, { v: "카드사", t: "s", s: common_style },{ v: "카드구분", t: "s", s: common_style }, { v: "상태", t: "s", s: common_style },
    { v: "승인금액", t: "s", s: common_style }, { v: "취소금액", t: "s", s: common_style }, { v: "잔액", t: "s", s: common_style },
    { v: "할부", t: "s", s: common_style }, { v: "구매자명", t: "s", s: common_style }, { v: "휴대폰번호", t: "s", s: common_style }, { v: "승인일자", t: "s", s: common_style }
  ],
  [
    { v: "번호", t: "s", s: common_style,  }, { v: "MCODE", t: "s", s: common_style }, { v: "가맹점", t: "s", s: common_style }, { v: "주문번호", t: "s", s: common_style },
    { v: "승인번호", t: "s", s: common_style }, { v: "승인일자", t: "s", s: common_style }, { v: "취소일자", t: "s", s: common_style }, { v: "상계금액", t: "s", s: common_style },
    { v: "처리상태", t: "s", s: common_style }, { v: "상계일자", t: "s", s: common_style }
  ],
]

const colWchs = [
  [ {wch:5}, {wch:10}, {wch:15}, {wch:20}, {wch:15}, {wch:20}, {wch:20}, {wch:15}, {wch:15}, {wch:15}]
]


export const ExcelDownload = async (data: any, type: number, typeName: string) => {
  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelExt = '.xlsx';
  const excelFileName = moment(new Date()).format('YYYYMMDDHHmmss');
  const savePath = `${RNFS.DownloadDirectoryPath}/`

  let common_style = {
    font  : {bold: "true"}, alignment: {horizontal: 'center'},
    border: {top: {style: 'thin'}, bottom: {style: 'thin'}, left: {style: 'thin'}, right: {style: 'thin'}},
    fill: { fgColor: { rgb: "E9E9E9" } }
  };
  let header = excelHeaders[type];

  const arrayList = data.map((data: any, i: number) => {
    let array: any[] = [];

    if(type == 0) {
      /* EXCEL 거래내역 */
      const [user] = useUserState();
      const level = Number(user?.GUBUN);
      let mer_pg_nm = '';

      if (level <= 1) {
        header.splice(3, 0, { v:"총판", t: "s", s: common_style })
        header.splice(4, 0, { v:"에이전시", t: "s", s: common_style })
        header.splice(5, 0, { v:"대리점", t: "s", s: common_style })
      } else if (level == 2) {
        header.splice(3, 0, { v:"총판", t: "s", s: common_style })
        header.splice(4, 0, { v:"에이전시", t: "s", s: common_style })
        header.splice(5, 0, { v:"대리점", t: "s", s: common_style })
      } else if (level == 3) {
        header.splice(3, 0, { v:"에이전시", t: "s", s: common_style })
        header.splice(4, 0, { v:"대리점", t: "s", s: common_style })
      } else if (level == 4) {
        header.splice(3, 0, { v:"대리점", t: "s", s: common_style })
      }

      if (data.USER_NO == 'KO') { mer_pg_nm = '코페이'; } else { mer_pg_nm = data.USER_NO; }
      array = [
        { v:data.row, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: {style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.M_CODE, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.mer_tid, t: "s", s: { alignment: { horizontal: 'center' },border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.MERCHANT_NAME, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.BIZ_GUBUN, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:mer_pg_nm, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.mer_pg_gubun, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.APPROVAL_NO, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.CARD_NAME, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v: data.TYPE, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.TRADE_STATUS_NAME, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.CONFIRM_AMT, t: "n", s: {fill: { fgColor: { rgb: "f5efae" } }, numFmt: "#,##0", border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.CANCEL_AMT, t: "n", s: { numFmt: "#,##0", border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.LEFT_AMT, t: "n", s: {numFmt: "#,##0", border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.MONTH_DIV+"개월", t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.USER_NAME, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.USER_PHONE, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:moment(data.CONFIRM_DATE, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss'), t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } }
      ]

      if (level <= 1) {
        array.splice(3, 0, { v:data.DISTRIBUTOR_NM, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } })
        array.splice(4, 0, { v:data.AGENCY_NM, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } })
        array.splice(5, 0, { v:data.FRANCHISE_NM, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } })

      } else if (level == 2) {
        array.splice(3, 0, { v:data.DISTRIBUTOR_NM, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } })
        array.splice(4, 0, { v:data.AGENCY_NM, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } })
        array.splice(5, 0, { v:data.FRANCHISE_NM, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } })
      } else if (level == 3) {
        array.splice(3, 0, { v:data.AGENCY_NM, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } })
        array.splice(4, 0, { v:data.FRANCHISE_NM, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } })
      } else if (level == 4) {
        array.splice(3, 0, { v:data.FRANCHISE_NM, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } })
      }

        
    } else if(type == 1) {
      /* EXCEL 상계내역 */
      let memo = data.CANCEL_MEMO;
      let TRADE_STATUS = "";
      let CONFIRM_DATE = "";
      if (data.TRADE_STATUS) {
        TRADE_STATUS = data.TRADE_STATUS === "E" ? "처리전" : memo ? "처리전" : memo == "입금" ? "입금" : "상계";
      }
      if (data.CONFIRM_DATE) {
        CONFIRM_DATE = moment(data.CONFIRM_DATE, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
      }
      let CAN_DATE = "";
      if (data.CAN_DATE) {
        CAN_DATE = moment(data.CAN_DATE, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
      }

      array = [
        { v:data.rownum, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: {style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.M_CODE, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.MERCHANT_NM, t: "s", s: { alignment: { horizontal: 'center' },border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.ORDER_NO, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.APPROVAL_NO, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:CONFIRM_DATE, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: {style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:CAN_DATE, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.TOT_CANCEL_AMT, t: "n", s: {fill: { fgColor: { rgb: "f5efae" } },numFmt: "#,##0", alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:TRADE_STATUS, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } },
        { v:data.MODIFY_DATE, t: "s", s: { alignment: { horizontal: 'center' }, border: { top: {style:'thin'}, bottom: { style:'thin'},left: {style:'thin'}, right: {style:'thin'} } } }
      ]
    }

    return array
  });

  arrayList.unshift(header);

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(arrayList);

  worksheet['!cols'] = colWchs[type];

  let day = new Date();
  XLSX.utils.book_append_sheet(workbook, worksheet, typeName);

  console.log(`${savePath}${typeName}_${day.getTime()}.xlsx`)
  // XLSX.writeFileXLSX(workbook, `setOff_${day.getTime()}.xlsx`);
  const bstr = XLSX.write(workbook, {type: 'binary', bookType: 'xlsx'});

  await RNFS.writeFile(`${savePath}${typeName}_${day.getTime()}.xlsx`, bstr, 'ascii');
}