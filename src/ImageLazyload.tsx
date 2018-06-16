/**
 * 图片懒加载
 */
import * as React from "react";

export declare interface IImageLazyloadProps extends React.ImgHTMLAttributes<HTMLImageElement>{
    placeholder:string;//展位图，如果没有占位图则没有必要使用该组件
}


class ImageLazyload extends React.Component<IImageLazyloadProps>{
    private _image:HTMLImageElement;
    private imageRef:HTMLImageElement;
    private loadImageUrl:string;
    constructor(props:IImageLazyloadProps){
        super(props);
        this._image=new Image();
        this.onLoad=this.onLoad.bind(this);
    }
    private onLoad(){
        this.loadImageUrl=this._image.src;
        this.imageRef.src=this.loadImageUrl;
        this._image.removeEventListener("load",this.onLoad);
    }
    componentDidMount(){
        const {src=""}=this.props;
        this._image.addEventListener("load",this.onLoad);
        this._image.src=src;
    }
    componentWillReceiveProps(nextProps:IImageLazyloadProps){
        const beforeSrc=this.props.src;
        const {src} = nextProps;
        if(beforeSrc!!==src){
            this._image.removeEventListener("load",this.onLoad);
            this._image.addEventListener("load",this.onLoad);
            this._image.src=src||"";
        }
    }
    render(){
        const {src,placeholder,...props} = this.props;
        return <img ref={(ref:HTMLImageElement)=>this.imageRef=ref} src={this.loadImageUrl||placeholder} {...props}/>
    }
}

export default ImageLazyload;