/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    Image,
    TouchableHighlight,
    ListView,
    Alert,
    TouchableNativeFeedback,
} from 'react-native';

import Header from './views/header'
/**
 * 时间转换
 * @param timestamp
 * @returns {*}
 */
function prettyTime(timestamp) {
    var createdDate = new Date();
    var distance = Math.round( ( +new Date() - timestamp ) / 60000 );
    var hours = ('0' + createdDate.getHours()).slice(-2);
    var minutes = ('0' + createdDate.getMinutes()).slice(-2);
    var month = ('0' + (createdDate.getMonth() + 1)).slice(-2);
    var date = ('0' + createdDate.getDate()).slice(-2);
    var year = createdDate.getFullYear();
    var string;
    if (distance < 1440) {
        string = [hours, minutes].join(':');
    } else if (distance < 2879) {
        string = 'Yesterday';
    } else {
        string = [date, month, year].join('/');
    }
    return string;
}
var url="http://g.hiphotos.baidu.com/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=278308933bdbb6fd3156ed74684dc07d/42a98226cffc1e17fcdb30594890f603738de976.jpg";
var urls =[url,url,url,url,url,url,url,url,url,url];

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 10;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

class HelloWorld extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        this.state = {
            dataSource:ds,
            loaded:false
        };
    }
    componentDidMount() {
        this.fetchData();

    }
    fetchData(){
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) =>{
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded:true
                });
            })
            .catch((error) => {
                console.warn(error);
             })
            .done();
    }
    _HeaderOnClick(mode){
        ToastAndroid.show(mode,ToastAndroid.SHORT)
    }
    render() {
        if (!this.state.loaded){
            return this.renderLoadingView();
        }
        return (
            <View style={{flex: 1}}>
                <Header
                    leftSource ={require('./img/head_back.png')}
                    rightSource = {require('./img/icon_pop_menu.png')}
                    titleText ={'测试Listview'}
                    leftText ={''}
                    rightText ={''}
                    onClick={this._HeaderOnClick}
                />
                <ListView
                    initialListSize={10}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                />
            </View>

        );
    }
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Header
                    leftSource ={require('./img/head_back.png')}
                    rightSource = {require('./img/icon_pop_menu.png')}
                    titleText ={'测试Listview'}
                    leftText ={''}
                    rightText ={''}
                    onClick={this._HeaderOnClick}
                />
                <Text style={{flex:1, textAlign:'center',textAlignVertical:'center'}}>
                    Loading movies...
                </Text>
            </View>
        );
    }
    _renderRow(rowData, sectionID: number, rowID: number) {
        return(
            <TouchableNativeFeedback >
                <View style={styles.row}>
                    <Text style={styles.title}>
                        {rowData.title}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <Image
                            source={{uri: rowData.posters.thumbnail}}
                            style={styles.img}
                        />
                        <View style={{flex:1}}   >
                            <Text numberOfLines={3} style={styles.instructions} >
                                {rowData.synopsis}
                            </Text>
                            <Text numberOfLines={1} style={styles.date}>
                                {rowData.release_dates.theater}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    row: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        padding:5,
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    title: {
        fontSize: 15,
        textAlign: 'left',
        margin: 10,
        color:'black'
    },
    instructions: {
        textAlign: 'left',
        color: 'green',
        marginBottom: 5,
        marginLeft:5,
    },
    date:{
        textAlign: 'left',
        marginLeft:5,
    },
    img:{
        //flex:1,
        width:54,
        height:80,
        resizeMode:Image.resizeMode.stretch,
        backgroundColor:"gray",
        marginLeft:10,

    }
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
