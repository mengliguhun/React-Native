/**
 * Created by Administrator on 2016/4/22.
 */
'use strict'
import React, {
    PropTypes,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableNativeFeedback,
} from 'react-native';

export default class  Header extends Component{

    static propTypes = {
        titleText:PropTypes.string,
        leftText:PropTypes.string,
        rightText:PropTypes.string,
        leftSource: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string,
            }),
            // Opaque type returned by require('./image.jpg')
            PropTypes.number,
        ]),
        rightSource: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string,
            }),
            // Opaque type returned by require('./image.jpg')
            PropTypes.number,
        ]),
        onClick:PropTypes.func,//click
        tag:PropTypes.any,

    }
    // 构造
    constructor(props) {
        super(props);
        this._onLefClick = this._onLefClick.bind(this);// 需要在回调函数中使用this,必须使用bind(this)来绑定
        this._onRightClick = this._onRightClick.bind(this);
    }
    _onLefClick(){// 在设置了回调函数的情况下
        if (this.props.onClick){
            this.props.onClick('left');
        }
    }
    _onRightClick(){// 在设置了回调函数的情况下
        if (this.props.onClick){
            this.props.onClick('right');
        }
    }
    render(){
        return(

                <View style={styles.container}>
                    <TouchableNativeFeedback style={styles.button} onPress={this._onLefClick}>
                        <View >
                            <Image
                                source={this.props.leftSource}
                                resizeMode={Image.resizeMode.center}
                                style={styles.icon}
                            >
                                <Text style={styles.text}>
                                    {this.props.leftText}
                                </Text>
                            </Image>
                        </View>
                    </TouchableNativeFeedback>

                    <Text style={styles.title}>{this.props.titleText}</Text>

                    <TouchableNativeFeedback style={styles.button} onPress={this._onRightClick}>
                        <View>
                            <Image source={this.props.rightSource}
                                   resizeMode={Image.resizeMode.center}
                                   style={styles.icon}
                            >
                                <Text style={styles.text}>
                                    {this.props.rightText}
                                </Text>
                            </Image>
                        </View>

                    </TouchableNativeFeedback>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:48,
        flexDirection:'row',
        backgroundColor: 'green',
        paddingLeft:10,
        paddingRight:10,
        alignItems: 'center',

    },
    button:{
        width:40,
        height:40,
        alignItems:'center',
        justifyContent: 'center',
    },
    icon:{
        width:40,
        height:40,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',

    },
    title:{
        height:40,
        flex:1,
        color:'white',
        fontSize:18,
        marginLeft:5,
        marginRight:5,
        textAlign:'center',
        textAlignVertical:'center'
    },
    text:{
        color:'white',
    },
});
