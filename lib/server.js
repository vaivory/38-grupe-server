import http from 'http';
import { utils } from './utils.js';
import { file } from './file.js';
import { router } from './router.js';
import config from '../config.js';
import { StringDecoder } from 'string_decoder';

import APIaccount from '../api/account.js';

const server = {};

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}/`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method.toLowerCase();  //istraukia uzklausa is tu vienu musu zodeliu get, post...
    const parsedPathName = parsedURL.pathname;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');   // regex

    const fileExtension = utils.fileExtension(trimmedPath);
    const textFileExtensions = ['css', 'js', 'svg', 'webmanifest', 'txt'];
    const binaryFileExtensions = ['jpg', 'png', 'ico'];
    const isTextFile = textFileExtensions.includes(fileExtension);
    const isBinaryFile = binaryFileExtensions.includes(fileExtension);
    const isAPI = trimmedPath.indexOf('api/') === 0; //jei api egzistuoja tai musu logika sako kad p[ api turi buti dar kazkas api/kjgl]
    const isPage = !isTextFile && !isBinaryFile && !isAPI;

    const maxAge = config.cache.periods[fileExtension] ?? config.cache.default;
    const MIMES = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        svg: 'image/svg+xml',
        png: 'image/png',
        jpg: 'image/jpeg',
        ico: 'image/x-icon',
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/ttf',
        otf: 'font/otf',
        eot: 'application/vnd.ms-fontobject',
        webmanifest: 'application/manifest+json',
        pdf: 'application/pdf',
        json: 'application/json',
    };

    const decoder = new StringDecoder('utf8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    })

    req.on('end', async () => {
        buffer += decoder.end();
        const [parsedErr, parsedContent] = utils.parseJSONtoObject(buffer);

        let responseContent = '';

        const dataForHandlers = {
            baseURL,
            trimmedPath,
            httpMethod,
            payload: parsedErr ? {} : parsedContent,
            user: {
                isLoggedIn: false,
                email: '',
                browser: '',
            }
        }

        console.log(dataForHandlers);

        if (isTextFile) {
            responseContent = await file.readPublic(trimmedPath);
            if (responseContent === false) {
                res.writeHead(404);
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension] || MIMES.html,
                    'Cache-Control': `max-age=${maxAge}`,
                })
            }
        }

        if (isBinaryFile) {
            responseContent = await file.readPublicBinary(trimmedPath);
            if (responseContent === false) {
                res.writeHead(404);
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension] || MIMES.html,
                    'Cache-Control': `max-age=${maxAge}`,
                })
            }
        }

        if (isAPI) {
            //reikes isimportuoti, ideti viena objekta ir
          const APIroute=trimmedPath.split('/')[1];
          if (server.API[APIroute] && server.API[APIroute][APIroute]){
            const APIhandler=server.API[APIroute][APIroute];

          }
        }

        if (isPage) {
            res.writeHead(200, {
                'Content-Type': MIMES.html,
            })

            const pageClass = router.getRoute(dataForHandlers);
            const pageObj = new pageClass(dataForHandlers);
            responseContent = pageObj.render();
        }

        return res.end(responseContent); //cia grazinam kontenta
    })
});

server.API={
    'account': APIaccount,
    'api/token': APItoken,
    'api/books': APIbooks,
}

server.init = () => {
    server.httpServer.listen(config.httpPort, () => {
        console.log(`Sveikiname, tavo serveris sukasi ant http://localhost:${config.httpPort}`);
    });
}

export { server };