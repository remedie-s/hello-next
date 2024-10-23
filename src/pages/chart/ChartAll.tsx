import ResponsiveGrid from "@/layout/ResponsiveGrid";
import Chart1 from "./Chart1";
import Chart4 from "./Chart4";
import Chart3 from "./Chart3";
import Chart2 from "./Chart2";

const ChartAll = ()=> {
    return(
        <div>
            <ResponsiveGrid>
                <Chart1/>
                <Chart2/>
                <Chart3/>
                <Chart4/>


            </ResponsiveGrid>
        </div>
    )
}

export default ChartAll;