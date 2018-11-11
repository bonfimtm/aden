import { PostService } from './database.service';

function playGround() {
    const service = new PostService();
    service.findByTitle('Which world leaders hold the power to launch a nuclear attack? 1f76d3c9-de77-4797-8cd6-89d4087ad772')
        .then(snapshot => {
            console.log(snapshot.size);
            snapshot.forEach(doc => {
                console.log(doc.id);
                // console.log(doc.id, doc.data());
            });
        });
    service.findAll()
        .then(snapshot => {
            console.log(snapshot.size);
            snapshot.forEach(doc => {
                console.log(doc.id);
                // console.log(doc.id, doc.data());
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}

playGround();
