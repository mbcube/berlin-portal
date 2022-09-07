import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import AuthGuard from "../../components/auth-guard";
import Spinner from "../../components/spinner";
import { database } from "../../lib/firebase";
import {
  RegistrationDocument,
  RegistrationItem,
} from "../../lib/models/registration.model";
import { UserType } from "../../lib/models/user-type.enum";

const RegistrationForms = () => {
  const [registrationDocument, setRegistrationDocument] =
    useState<RegistrationDocument>();

  const [selectedItem, setSelectedItem] = useState<RegistrationItem | null>();
  const [selectedResumeUrl, setSelectedResumeUrl] = useState<string>();

  useEffect(() => {
    const getDocument = async () => {
      const documentQuery = await getDoc(
        doc(database, "registration", "registration-0")
      );

      const document = {
        ...documentQuery.data(),
      } as RegistrationDocument;

      setRegistrationDocument(document);
    };

    getDocument();
  }, []);

  async function selectItem(item: RegistrationItem) {
    setSelectedItem(item);
    const storage = getStorage();
    const url = await getDownloadURL(ref(storage, item.resume));
    setSelectedResumeUrl(url);
  }

  function clearItem(): void {
    setSelectedItem(null);
    setSelectedResumeUrl("");
  }

  return (
    <AuthGuard userTypes={[UserType.Admin, UserType.Teacher]}>
      <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div className="container-xl px-4">
          <div className="page-header-content">
            <div className="row align-items-center justify-content-between pt-3">
              <div className="col-auto mb-3">
                <h1 className="page-header-title">
                  <div className="page-header-icon">
                    <i data-feather="user"></i>
                  </div>
                  Registration List
                </h1>
              </div>
              <div className="col-auto col-xl-auto mb-3">
                <button
                  onClick={() => {
                    clearItem();
                  }}
                  className={`btn btn-sm btn-light text-primary ${
                    !selectedItem ? "invisible" : ""
                  }`}
                  disabled={!selectedItem}
                >
                  <i className="bi bi-arrow-left-short"></i>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container-xl px-4">
        <div className="row">
          <div className="col">
            <div className="card mb-4">
              <div className="card-body">
                {!registrationDocument && <Spinner />}
                {selectedItem && (
                  <>
                    <h5 className="card-title mb-3">
                      {selectedItem?.fullName}
                    </h5>
                    <div className="row">
                      <div className="col-md-12 col-lg-6">
                        <p>
                          <i className="bi bi-envelope me-2"></i>
                          <a href={`mailto:${selectedItem.email}`}>
                            {`${selectedItem.email}`}
                          </a>
                        </p>
                        <p>
                          <i className="bi bi-telephone me-2"></i>
                          <a
                            href={`tel:${selectedItem.phone}`}
                          >{`${selectedItem.phone}`}</a>
                        </p>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <p>
                          <i className="bi bi-calendar-event me-2"></i>
                          {`${selectedItem.createdDate}`}
                        </p>
                        <p>
                          <i className="bi bi-file-person me-2"></i>
                          <a href={selectedResumeUrl} target="blank">
                            {`${selectedItem.resume}`}
                          </a>
                        </p>
                      </div>
                      <div className="col-md-12">
                        <h5>Address: </h5>
                        <p>{`${selectedItem.address}`}</p>
                        <h5>Comments: </h5>
                        <p>{`${selectedItem.comments}`}</p>
                      </div>
                    </div>
                  </>
                )}

                {!selectedItem && registrationDocument && (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Created Date</th>
                        <th>FullName</th>
                        <th>Resume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrationDocument.registration?.map(
                        (registration) => {
                          return (
                            <tr
                              key={registration.phone}
                              onClick={() => {
                                selectItem(registration);
                              }}
                            >
                              <td>{registration.createdDate}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  {registration.fullName}
                                </div>
                              </td>
                              <td>{registration.resume}</td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default RegistrationForms;
