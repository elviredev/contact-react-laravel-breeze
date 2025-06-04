import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Head, Link } from "@inertiajs/react"
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { PropsSinglePage } from "@/types";

const SingleContact = ({contact}: PropsSinglePage) => {
  return (
    <>
      <Head title={`${contact.first_name} ${contact.last_name}`} />

      <div className="py-12">

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Link
            href={route("contacts.index")}
            className="inline-flex items-center gap-2 px-4 py-2 text-md font-medium rounded-md hover:bg-main-color hover:[&>svg]:text-black hover:text-black transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-main-color" />
            <span>Retour à la liste</span>
          </Link>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">
                {contact.first_name} {contact.last_name}
              </CardTitle>
              <CardDescription className="text-2xl uppercase mt-4">
                Détails du contact
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {contact.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-6 w-6 text-main-color" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-blue-400 hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
              )}

              {contact.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-6 w-6 text-main-color" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-blue-400 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}

              {(contact.address || contact.city || contact.postal_code || contact.country) && (
                <div className="flex items-start space-x-2">
                  <MapPin className="h-6 w-6 text-main-color" />
                  <div>
                    {contact.address && <p>{contact.address}</p>}
                    <div className="space-x-2">
                      {contact.postal_code && <span>{contact.postal_code}</span>}
                      {contact.city && <span>{contact.city}</span>}
                    </div>
                    {contact.country && <span>{contact.country}</span>}
                  </div>
                </div>
              )}

              {contact.notes && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-main-color mb-2">Notes</h3>
                  <p className="text-light-white whitespace-pre-wrap">
                    {contact.notes}
                  </p>
                </div>
              )}

            </CardContent>
          </Card>
        </div>

      </div>
    </>
  )
}
export default SingleContact
