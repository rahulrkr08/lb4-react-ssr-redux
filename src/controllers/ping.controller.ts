import { Request, RestBindings, get, ResponseObject } from '@loopback/rest';
import { inject } from '@loopback/context';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: { type: 'string' },
          date: { type: 'string' },
          url: { type: 'string' },
          headers: {
            type: 'object',
            properties: {
              'Content-Type': { type: 'string' },
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

  // Map to `GET /ping`
  @get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from server',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  // Map to `GET /ping`
  @get('/circuits', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  circuits(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {"MRData":{"xmlns":"http:\/\/ergast.com\/mrd\/1.4","series":"f1","url":"http://ergast.com/api/f1/2018/circuits.json","limit":"30","offset":"0","total":"21","CircuitTable":{"season":"2018","Circuits":[{"circuitId":"albert_park","url":"http:\/\/en.wikipedia.org\/wiki\/Melbourne_Grand_Prix_Circuit","circuitName":"Albert Park Grand Prix Circuit","Location":{"lat":"-37.8497","long":"144.968","locality":"Melbourne","country":"Australia"}},{"circuitId":"americas","url":"http:\/\/en.wikipedia.org\/wiki\/Circuit_of_the_Americas","circuitName":"Circuit of the Americas","Location":{"lat":"30.1328","long":"-97.6411","locality":"Austin","country":"USA"}},{"circuitId":"bahrain","url":"http:\/\/en.wikipedia.org\/wiki\/Bahrain_International_Circuit","circuitName":"Bahrain International Circuit","Location":{"lat":"26.0325","long":"50.5106","locality":"Sakhir","country":"Bahrain"}},{"circuitId":"BAK","url":"http:\/\/en.wikipedia.org\/wiki\/Baku_City_Circuit","circuitName":"Baku City Circuit","Location":{"lat":"40.3725","long":"49.8533","locality":"Baku","country":"Azerbaijan"}},{"circuitId":"catalunya","url":"http:\/\/en.wikipedia.org\/wiki\/Circuit_de_Barcelona-Catalunya","circuitName":"Circuit de Barcelona-Catalunya","Location":{"lat":"41.57","long":"2.26111","locality":"Montmeló","country":"Spain"}},{"circuitId":"hockenheimring","url":"http:\/\/en.wikipedia.org\/wiki\/Hockenheimring","circuitName":"Hockenheimring","Location":{"lat":"49.3278","long":"8.56583","locality":"Hockenheim","country":"Germany"}},{"circuitId":"hungaroring","url":"http:\/\/en.wikipedia.org\/wiki\/Hungaroring","circuitName":"Hungaroring","Location":{"lat":"47.5789","long":"19.2486","locality":"Budapest","country":"Hungary"}},{"circuitId":"interlagos","url":"http:\/\/en.wikipedia.org\/wiki\/Aut%C3%B3dromo_Jos%C3%A9_Carlos_Pace","circuitName":"Autódromo José Carlos Pace","Location":{"lat":"-23.7036","long":"-46.6997","locality":"São Paulo","country":"Brazil"}},{"circuitId":"marina_bay","url":"http:\/\/en.wikipedia.org\/wiki\/Marina_Bay_Street_Circuit","circuitName":"Marina Bay Street Circuit","Location":{"lat":"1.2914","long":"103.864","locality":"Marina Bay","country":"Singapore"}},{"circuitId":"monaco","url":"http:\/\/en.wikipedia.org\/wiki\/Circuit_de_Monaco","circuitName":"Circuit de Monaco","Location":{"lat":"43.7347","long":"7.42056","locality":"Monte-Carlo","country":"Monaco"}},{"circuitId":"monza","url":"http:\/\/en.wikipedia.org\/wiki\/Autodromo_Nazionale_Monza","circuitName":"Autodromo Nazionale di Monza","Location":{"lat":"45.6156","long":"9.28111","locality":"Monza","country":"Italy"}},{"circuitId":"red_bull_ring","url":"http:\/\/en.wikipedia.org\/wiki\/Red_Bull_Ring","circuitName":"Red Bull Ring","Location":{"lat":"47.2197","long":"14.7647","locality":"Spielburg","country":"Austria"}},{"circuitId":"ricard","url":"http:\/\/en.wikipedia.org\/wiki\/Paul_Ricard_Circuit","circuitName":"Circuit Paul Ricard","Location":{"lat":"43.2506","long":"5.79167","locality":"Le Castellet","country":"France"}},{"circuitId":"rodriguez","url":"http:\/\/en.wikipedia.org\/wiki\/Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez","circuitName":"Autódromo Hermanos Rodríguez","Location":{"lat":"19.4042","long":"-99.0907","locality":"Mexico City","country":"Mexico"}},{"circuitId":"shanghai","url":"http:\/\/en.wikipedia.org\/wiki\/Shanghai_International_Circuit","circuitName":"Shanghai International Circuit","Location":{"lat":"31.3389","long":"121.22","locality":"Shanghai","country":"China"}},{"circuitId":"silverstone","url":"http:\/\/en.wikipedia.org\/wiki\/Silverstone_Circuit","circuitName":"Silverstone Circuit","Location":{"lat":"52.0786","long":"-1.01694","locality":"Silverstone","country":"UK"}},{"circuitId":"sochi","url":"http:\/\/en.wikipedia.org\/wiki\/Sochi_Autodrom","circuitName":"Sochi Autodrom","Location":{"lat":"43.4057","long":"39.9578","locality":"Sochi","country":"Russia"}},{"circuitId":"spa","url":"http:\/\/en.wikipedia.org\/wiki\/Circuit_de_Spa-Francorchamps","circuitName":"Circuit de Spa-Francorchamps","Location":{"lat":"50.4372","long":"5.97139","locality":"Spa","country":"Belgium"}},{"circuitId":"suzuka","url":"http:\/\/en.wikipedia.org\/wiki\/Suzuka_Circuit","circuitName":"Suzuka Circuit","Location":{"lat":"34.8431","long":"136.541","locality":"Suzuka","country":"Japan"}},{"circuitId":"villeneuve","url":"http:\/\/en.wikipedia.org\/wiki\/Circuit_Gilles_Villeneuve","circuitName":"Circuit Gilles Villeneuve","Location":{"lat":"45.5","long":"-73.5228","locality":"Montreal","country":"Canada"}},{"circuitId":"yas_marina","url":"http:\/\/en.wikipedia.org\/wiki\/Yas_Marina_Circuit","circuitName":"Yas Marina Circuit","Location":{"lat":"24.4672","long":"54.6031","locality":"Abu Dhabi","country":"UAE"}}]}}};
  }
}