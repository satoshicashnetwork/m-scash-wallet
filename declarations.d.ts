declare module '*.svg' {
    import {ComponentClass, FunctionComponent} from 'react';
    import Svg, {SvgProps} from 'react-native-svg';

    interface SVGComponent extends FunctionComponent<SvgProps> {
        (props: SvgProps): JSX.Element;
    }

    const SVGComponent: SVGComponent;
    export default SVGComponent;
}