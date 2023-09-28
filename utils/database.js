import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE if NOT EXISTS places (
         id INTEGER PRIMARY KEY NOT NULL,
         title TEXT NOT NULL,
         imageUrl TEXT NOT NULL,
         address TEXT NOT NULL,
         lat REAL NOT NULL,
         lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUrl, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUrl,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];

          for (const data of result.rows._array) {
            places.push(
              new Place(
                data.title,
                data.imageUrl,
                {
                  address: data.address,
                  lat: data.lat,
                  lng: data.lng,
                },
                data.id
              )
            );
          }
          
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
