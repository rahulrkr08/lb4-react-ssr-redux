// import application from '../app';


export async function storeContentToDB(contents: any) {

    // const db = application.get('db');

    // // Collecting documentIds, to search
    //
    // let documentIds: any = contents.map((content: any) => content._id);
    // new Promise((resolve, reject) => {
    //     db.list({
    //         'keys': documentIds,
    //         'include_docs': true
    //
    //     }, function (err: any, body: any) {

    //         if (!err) resolve(body.rows);
    //         else reject(err)
    //     });
    //
    // }).then((data: any) => {

    //     // Updating with _rev
    //
    //     data.forEach(function (doc: any) {
    //         if (doc.doc) {
    //
    //             contents.some((content: any) => {
    //                 if (content._id === doc.key) {
    //                     content._rev = doc.doc._rev;
    //                     return true; //breaks out of he loop
    //                 }
    //             });
    //         }
    //     });

    //
    //     db.bulk({ docs: contents }, (err: any, responseData: any) => {
    //         if (err)
    //             throw new Error(err)
    //         else {
    //
    //             responseData.map((d: any) => {
    //                 if (!d.ok) {
    //                     console.log(`Error: storing data ID: ${d.id}`, d)
    //                 }
    //             })
    //         }
    //     });
    // })
}
