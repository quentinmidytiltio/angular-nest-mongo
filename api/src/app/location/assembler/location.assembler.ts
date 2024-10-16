import { LocationDBO } from "../../database/schemas/location.schema";
import { Location } from "@angular-nest-mongo/shared-lib"

export function toLocationDbo(location: Location): LocationDBO {
    if (location) {
        return {
            title: location.title,
            coordinates: location.coordinates,
        } as unknown as LocationDBO
    } else {
        return null
    }
}