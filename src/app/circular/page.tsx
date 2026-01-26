import {getApiService} from "@/core/http";
import CircularSlider from "@/app/circular/circularSlider";
import "./slider.scss"
import Catalog from "@/app/products/[id]/[title]/catalog";
import Loading from "@/app/loading";
import ServerError from "@/app/server-error/server-error";

interface FieldsInterface {
    text: string,
    title: string,
    field_type_id: number,
    value:number
}

export default async function Circular(){
    let data: PageInterface | null = null;

    try {
        data = await getApiService("circular");
    } catch (error) {
        return <ServerError />;
    }

    if (!data || !data.data?.circular?.contents?.data?.[0]) {
        return <Loading />;
    }
    const circular = data.data.circular.contents.data[0]
    const fields: Record<string, FieldsInterface> = JSON.parse(circular.fields);
    return(
        <>
            <div className="container py-5">
                <div className="circular">
                    <div className="circular-title">
                        <h1>{ circular.title }</h1>
                    </div>
                    <div className="mt-5">
                        <CircularSlider data={circular} />
                    </div>
                    <div className="circular-info mt-5 fs-26px first-color fw-600" dangerouslySetInnerHTML={{ __html: circular.body }}></div>
                    <div className="circular-catalog">
                        <Catalog fields={fields}/>
                    </div>
                </div>
            </div>
        </>
    )
}