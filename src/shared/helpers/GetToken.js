import { client_name, client_Password } from "../../environment/devolpmentApi";

async function getToken() {
    const params = new URLSearchParams();
    params.set("username", client_name); // Replace with your actual Client ID
    params.set("password", client_Password); // Replace with your actual Client Secret
    //-----------------

    params.set("client", "referer"); // or 'requestip' or 'ip'
    params.set("referer", "https://www.arcgis.com"); // or 'requestip' or 'ip'
    params.set("grant_type", "client_credentials"); // Use client_credentials grant type
    params.set("f", "json"); // Format response as JSON
    params.set("expiration", "7200"); // Set the token to expire in 2 hours (120 minutes)
    const res = await fetch(
        "https://gis.coatessandbox.com/portal/sharing/rest/generatetoken",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        }
    );
    if (!res.ok) {
        throw new Error(`Response Status : ${res.status}`);
    }
    const json = await res.json();

    localStorage.setItem("LayerToken", JSON.stringify(json?.token));
}
export default getToken;
