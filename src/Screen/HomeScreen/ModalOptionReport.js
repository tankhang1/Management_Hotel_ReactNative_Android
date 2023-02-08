import {
  View,
  Text,
  Modal,
  Pressable,
  ToastAndroid,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {memo} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {collection, getDoc, getDocs, query, where} from 'firebase/firestore';
import {db} from '../../Firebase/firebase';
import {writeFile, DownloadDirectoryPath} from 'react-native-fs';
import XLSX from 'xlsx';
const DATE = [...new Array(31)];
const MONTH = [...new Array(12)];
const YEAR = [...new Array(1)];
const ModalOptionReport = ({
  openModal,
  changeModal,
  setFirstDay,
  setSecondDay,
  changeDate,
  exportExcel,
}) => {
  const [fromDate, setFromDate] = useState(1);
  const [fromMonth, setFromMonth] = useState(1);
  const [fromYear, setFromYear] = useState(2022);
  const [toMonth, setToMonth] = useState(1);
  const [toYear, setToYear] = useState(2022);
  const [toDate, setToDate] = useState(1);
  const [dataExport, setDataExport] = useState([]);
  const exportData = async () => {
    let tmpFirstDay = new Date(`${fromYear}-${fromMonth}-${fromDate}`);
    let tmpSecondDay = new Date(`${toYear}-${toMonth}-${toDate}`);
    let data = [];
    const getDbYear = await getDocs(collection(db, 'Revenue'));
    getDbYear.forEach(async dbyear => {
      if (
        Number(moment(dbyear.data().Date.toDate()).format('YYYY')) >=
          fromYear &&
        Number(moment(dbyear.data().Date.toDate()).format('YYYY')) <= toYear
      ) {
        const getDbMonth = await getDocs(
          collection(db, `/Revenue/${dbyear.id}/Revenue_Monthly`),
        );
        getDbMonth.forEach(async doc => {
          if (
            Number(moment(doc.data().Date.toDate()).format('MM')) >=
              fromMonth &&
            Number(moment(doc.data().Date.toDate()).format('MM')) <= toMonth
          ) {
            const getDbDate = await getDocs(
              collection(
                db,
                `/Revenue/${dbyear.id}/Revenue_Monthly/${doc.id}/Revenue_Daily`,
              ),
            );
            getDbDate.forEach(date => {
              if (
                new Date(date.data().Date.toDate()) >= tmpFirstDay &&
                new Date(date.data().Date.toDate()) <= tmpSecondDay
              ) {
                data.push({
                  Date: moment(date.data().Date.toDate()).format('DD/MM/YYYY'),
                  Money: date.data().Money,
                });
                setDataExport([...data]);
              }
            });
          }
        });
      }
    });
  };

  const exportDataToExecl = async () => {
    exportData().finally(async () => {
      if (dataExport.length > 0) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(dataExport);
        XLSX.utils.book_append_sheet(wb, ws, 'DataBill');
        const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
        // Write generated excel to Storage
        await writeFile(
          DownloadDirectoryPath +
            `/DataBill${Math.floor(Math.random() * 100)}.xlsx`,
          wbout,
          'ascii',
        )
          .then(r => {
            ToastAndroid.show(
              'file DataBill.xlsx has created in directory',
              2000,
            );
          })
          .catch(e => {
            Alert.alert('Error', e);
          });
      }
    });
    changeModal();
  };

  const handleExport = async () => {
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (!isPermitedExternalStorage) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permistion needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          exportDataToExecl();
          console.log('Permistion granted');
        } else {
          console.log('Permission denied');
        }
      } else {
        exportDataToExecl();
      }
    } catch (error) {
      console.log('Error while checking permission');
      console.log(error.message);
      return;
    }
  };
  return (
    <Modal visible={openModal} onRequestClose={changeModal} transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(186,186,186,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '95%',
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          {!exportExcel ? (
            <View
              style={{
                paddingHorizontal: 10,
                marginVertical: 10,
              }}>
              <CalendarPicker
                onDateChange={(date, type) => {
                  if (type === 'START_DATE')
                    setFirstDay(moment(date).format('DD/MM/YYYY'));
                  else setSecondDay(moment(date).format('DD/MM/YYYY'));
                }}
                allowRangeSelection={true}
                minRangeDuration={2}
                maxRangeDuration={8}
              />

              <Pressable
                onPress={changeDate}
                style={{
                  marginVertical: 20,
                  alignSelf: 'center',
                  backgroundColor: 'hsl(171,62%,48%)',
                  width: 100,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                  }}>
                  Confirm
                </Text>
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                paddingVertical: 20,
              }}>
              {/*From Date */}
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginVertical: 10,
                    paddingHorizontal: 10,
                  }}>
                  From date
                </Text>
                {/*From */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Picker
                    style={{
                      flex: 1,
                    }}
                    selectedValue={fromDate}
                    onValueChange={(itemValue, itemIndex) => {
                      setFromDate(itemValue);
                    }}
                    mode="dropdown">
                    {DATE.map((_, i) => (
                      <Picker.Item
                        key={i}
                        label={`${i + 1}`}
                        value={i + 1}
                        style={{
                          color: 'black',
                          backgroundColor: 'hsl(222,56%,96%)',
                        }}
                      />
                    ))}
                  </Picker>
                  <Picker
                    style={{
                      flex: 1,
                    }}
                    selectedValue={fromMonth}
                    onValueChange={(itemValue, itemIndex) =>
                      setFromMonth(itemValue)
                    }
                    mode="dropdown">
                    {MONTH.map((_, i) => (
                      <Picker.Item
                        key={i}
                        label={`${i + 1}`}
                        value={i + 1}
                        style={{
                          color: 'black',
                          backgroundColor: 'hsl(222,56%,96%)',
                        }}
                      />
                    ))}
                  </Picker>
                  <Picker
                    style={{
                      flex: 1,
                    }}
                    selectedValue={fromYear}
                    onValueChange={(itemValue, itemIndex) =>
                      setFromYear(itemValue)
                    }
                    mode="dropdown">
                    {YEAR.map((_, i) => (
                      <Picker.Item
                        key={i}
                        label={`${2022 + i}`}
                        value={2022 + i}
                        style={{
                          color: 'black',
                          backgroundColor: 'hsl(222,56%,96%)',
                        }}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              {/*To Date */}
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginVertical: 10,
                    paddingHorizontal: 10,
                  }}>
                  To date
                </Text>
                {/*To Date */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Picker
                    style={{
                      flex: 1,
                    }}
                    selectedValue={toDate}
                    onValueChange={(itemValue, itemIndex) => {
                      setToDate(itemValue);
                    }}
                    mode="dropdown">
                    {DATE.map((_, i) => (
                      <Picker.Item
                        key={i}
                        label={`${i + 1}`}
                        value={i + 1}
                        style={{
                          color: 'black',
                          backgroundColor: 'hsl(222,56%,96%)',
                        }}
                      />
                    ))}
                  </Picker>
                  <Picker
                    style={{
                      flex: 1,
                    }}
                    selectedValue={toMonth}
                    onValueChange={(itemValue, itemIndex) =>
                      setToMonth(itemValue)
                    }
                    mode="dropdown">
                    {MONTH.map((_, i) => (
                      <Picker.Item
                        key={i}
                        label={`${i + 1}`}
                        value={i + 1}
                        style={{
                          color: 'black',
                          backgroundColor: 'hsl(222,56%,96%)',
                        }}
                      />
                    ))}
                  </Picker>
                  <Picker
                    style={{
                      flex: 1,
                    }}
                    selectedValue={toYear}
                    onValueChange={(itemValue, itemIndex) =>
                      setToYear(itemValue)
                    }
                    mode="dropdown">
                    {YEAR.map((_, i) => (
                      <Picker.Item
                        key={i}
                        label={`${2022 + i}`}
                        value={2022 + i}
                        style={{
                          color: 'black',
                          backgroundColor: 'hsl(222,56%,96%)',
                        }}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              <Pressable
                onPress={handleExport}
                style={{
                  marginVertical: 20,
                  alignSelf: 'center',
                  backgroundColor: 'hsl(171,62%,48%)',
                  width: 100,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                  }}>
                  Export
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default memo(ModalOptionReport);
