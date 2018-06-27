import React, {Component} from 'react';
import './App.css';
import Add from '../Add/Add';
import Mostrar from '../Add/Mostrar';
import {TopBar} from '../Add/TopBar';
import {Welcome} from '../Welcome/Welcome';
import {DataTable} from '../DataTable/DataTable'
import {Card, CardContent} from "material-ui";
import FirebaseService from '../../service/FirebaseService';
import {MuiThemeProvider} from "material-ui/styles/index";
import {createMuiTheme} from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {urls, privateUrls} from "../../utils/urlUtils";

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends Component {
    state = {
      data: []
    };
    componentDidMount() {
      FirebaseService.getDataList('leituras', (dataReceived) =>    this.setState({data: dataReceived}))
    };
    render() {
      return (
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <TopBar />
            <Card style={{margin: '50px'}}>
                  <CardContent>

                      

                      <Route exact
                              path={urls.data.path}
                              render={(props) => 
                                  <DataTable {...props} data={this.state.data}/>}
                      />

                      <Route exact
                              path={urls.add.path}
                              render={(props) => 
                                      <Add {...props}/>}
                      />
                      <Route exact
                            path={privateUrls.edit.path}
                            render={(props) => <Add {...props} />}
                      />
                      <Route exact
                            path={privateUrls.mostrar.path}
                            render={(props) => <Mostrar {...props} />}
                      />
                  </CardContent>
              </Card>
          </React.Fragment>
        </MuiThemeProvider>
      );
    }
}

export default App;