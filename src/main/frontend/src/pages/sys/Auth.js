import React, {useEffect, useState} from "react";
import { makeStyles } from "@mui/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import SearchBar from "../../components/SearchBar/SearchBar";
import {SchTextField} from "../../components/SearchBar/Components/TextFieldDefault"
import {client} from '../../contraints';
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { CenterFocusStrong, RowingRounded } from "@mui/icons-material";
import { gvGridDropdownDisLabel, gvGetRowData, gvSeData } from "../../components/Common";

//Modal
import MyModal from "../../components/Modal/MyModal.js";
import useModal from "../../components/Modal/useModal";

//page
// import BizDetailPop from  './BizDetailPop'
const useYnCmb = [{value:"Y", label:"사용"},{value:"N", label:"미사용"}];
const delYnCmb = [{value:"Y", label:"삭제"},{value:"N", label:"미삭제"}];

// const roleFormater = ({id : rowId, value, field, api }) =>{
//     roleOption.find((opt)=> opt.value === value).label
// }
//tyles :'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions';
const columns = [
  { field: "id",  headerName: "ID",                        align:"center", width:20},
  { field: "bizCd", headerName: "사업자코드", editable: false, align:"center", width:120},
  { field: "authSeq",  headerName: "권한순번", editable: false, align:"center", width:120},
  { field: "authNm",  headerName: "권한명", editable: true, width:200},
  { field: "authDesc",  headerName: "권한설명", editable: true, width:500},
  { field: "inUserId",  headerName: "등록자",},
  { field: "inDt",      headerName: "등록일시",},
  { field: "upUserId",  headerName: "수정자",},
  { field: "upDt",      headerName: "수정일시",},
];

 

export default function User(props) {
  const {menuNm} = props; //메뉴명
  const getRowId = "";
  const {openModal} = useModal();

  //그리드 선택된 행
  const [selRowId, setSelRowId] = useState(-1);
  //메뉴 데이터 변수
  const [dataList, setDataList] = useState([]); //

  //Modal
  // const [isOpen, setIsOpen] = React.useState(false);

  //조회조건
  const [schValues, setSchValues] = useState();
  const onChangeSearch = (event) => {
    event.persist();
    setSchValues({ ...values, [event.target.id]: event.target.value });
  };

  const onKeyDown = (e) =>{
    e.persist();
    if(e.keyCode === 13){
        e.preventDefault();
        fnSearch();
        return;
    }
  }

  //핸들링하고 있는 rowData 저장
  const [values, setValues] = useState({ 
    id : 0,
    bizCd : "",
    authSeq : "",
    authNm : "",
    authDesc : "",
  });
  // const onChagneHandle = (event) => {
  //   setValues({ ...values, [event.target.id]: event.target.value });
  // };

  //화면 로드시 1번만 실행
  useEffect(() => {
    fnSearch();
  }, []);
  
  //조회
  const fnSearch = () => {
    console.log('gvSeData',gvSeData);

    var params = {
      bizCd : gvSeData.bizCd,
      userId : gvSeData.userId
    }
    
    client.post(`/api/sys/auth/selectAuthList`, params)
      .then(res => {
        var dataList = res.data.content;
        setDataList(dataList);
        if(dataList.length > -1){
          setSelRowId(1);
          // fnSearchDtl(dataList[0]);
        }else{

        }
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  //조회 클릭
  function onClickSelect(){
    fnSearch();
  }

  //신규클릭
  function onClickAdd(){
    console.log(gvSeData.bizCd)
    //선택된 행 다음에 추가
    setDataList(dataList => dataList.concat({
      id:dataList.length+1,
      bizCd: gvSeData.bizCd,
      authSeq : "",
      authNm : "",
      authDesc : "",
    }));
  }

  //저장클릭
  function onClickSave(){
    var rowData = gvGetRowData(dataList, selRowId);
    console.log('저장',rowData)
    openModal(MyModal, {
      title:"",
      content:"저장 하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(
          `/api/sys/auth/saveAuth`,rowData)
          .then(res => {
            alert('저장되었습니다.');
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }

  //삭제클릭
  function onClickDel(){
    var rowData = gvGetRowData(dataList, selRowId);
    console.log('삭제', rowData)
    openModal(MyModal, {
      title:"",
      content:"삭제 하시겠습니까?",
      onSubmit: () => {
        //메뉴리스트 저장
        client.post(
          `/api/sys/auth/deleteAuth`,rowData)
          .then(res => {
            alert('삭제되었습니다.')
            fnSearch();
          }).catch(error => { 
            console.log('error = '+error); 
          })

      }
    });
  }


  return (
    <>
      <PageTitle title={menuNm} />
      <SearchBar
      onClickSelect={onClickSelect} 
      onClickAdd={onClickAdd} 
      onClickSave={onClickSave}
      onClickDel={onClickDel}
      >
          <SchTextField id="authSeq" label='권한' 
            onChange={onChangeSearch} 
            onKeyDown={onKeyDown} />    
      </SearchBar>
      
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ height: 500, width: '100%' }}>
        <DataGrid
            title={"Auth List"} //제목
            rows={dataList} //dataList
            columns={columns} //컬럼 정의
            headerHeight={30} //헤더 높이
            rowHeight={28} //행 높이
            footerHeight={30} //푸터 높이
            // hideFooter={true}
            paginationMode={'client'} //page 처리 위치
            onRowClick={(e)=>{setValues(e.row);setSelRowId(e.row.id)} } //로우 클릭이벤트
            selectionModel={selRowId} //쎌선택 변수지정
            onCellEditCommit={React.useCallback((params) => {dataList[params.id-1][params.field] = params.value;},[dataList])} //쎌변경시 데이터변경
          />
        </Grid>
      </Grid>
      {/* <BizDetailPop isOpen={isOpen} setIsOpen={setIsOpen} id={id} flag={modalStatusFlag} /> */}
    </>
  );
}
