import React from 'react';
import MaterialTable from 'material-table';
import { Card, TextField, Avatar } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles';

import {useDataContext} from '../DataContext';

import {API_URL} from '../constants';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#ff9100',
      },
    },

  });
export default function Table (props) {
    const {getData} = useDataContext();
    return (
        <MuiThemeProvider theme={theme}>
        <MaterialTable
            title=""
            columns={[
            {
                field: 'url',
                title: 'Avatar',
                render: rowData => <Avatar alt="selfie" src={API_URL + rowData.avatar.formats.small.url} style={{width: 30, height: 30}}/>
            },
            { title: 'Company', field: 'company' },
            { title: 'Department', field: 'department' },
            { title: 'Emp. ID', field: 'empID' },
            { title: 'First name', field: 'firstName' },
            { title: 'Last name', field: 'lastName' },
            { title: 'gender', field: 'gender' },
            { title: 'Email', field: 'email' },
            ]}
            options={{
                search: true,
                exportButton: true,
                paging: true,
                filtering: true,
                pageSize: 20,
                pageSizeOptions: [5,10,20,50]
            }}
            options={{
              rowStyle: {
                height: '30px !important',
                padding:  0,

              }
            }}
            actions={[
                {
                  icon: 'map',
                  tooltip: 'Save User',
                  onClick: (event, rowData) => {
                    // Do save operation
                    alert(JSON.stringify(rowData))
                    this.props.callMap(rowData);
                  }
                }
            ]}
            data={query =>
            new Promise((resolve, reject) => {
                let url = API_URL + '/staff-locations?'
                url += '_limit=' + query.pageSize
                url += '&_start=' + (query.page)* query.pageSize
                url += query.search?'&empID=' + query.search:""
                fetch(url).then(response => {
                    console.log(query);
                    var length = response.headers.get('Content-Range');
                    console.log(response.headers.get('Content-Range'))
                    response.json().then(result => {
                    getData(result)
                    resolve({
                        data: result,
                        page: query.page,
                        totalCount: length,
                    })
                    });
                })
            })
            }
        />
        </MuiThemeProvider>
    )
}