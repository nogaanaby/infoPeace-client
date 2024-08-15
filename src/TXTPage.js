import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TXTPage = () => {
    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-4 text-primary">About Page</h1>
            </div>
            <div className="card shadow-sm p-4 mb-4 bg-white rounded">
                <div className="card-body">
                    <p className="lead">
                        Infopeace is a social-technological initiative aimed at increasing awareness and hope for peace in the Middle East. The platform is an application-based website (web/mobile/app). Initially, it focuses on data presentation.
                    </p>
                    <h2 className="text-info">General Description:</h2>
                    <p>
                        Those who are interested in peace can answer the questionnaire, thereby adding data to the site. The data can be viewed in various formats to examine what citizens who desire peace truly feel: under what conditions they want peace, what they are willing to compromise on, and demographic details they are willing to share.
                    </p>
                    <h2 className="text-info">Project Goal:</h2>
                    <p>
                        To build a strong community in the Middle East that aspires to peace, thereby showing those who may have lost hope or do not believe that a wide and growing community exists across different cultures/sects that desires peace. Through the initiative, hope for peace among citizens will grow, with the aim that more people will join this community until:
                    </p>
                    <h3 className="text-success">Phase One:</h3>
                    <p>
                        Economic support will be generated as the community grows, along with donations from investors who believe in the idea, to support collaborative initiatives between different sects in the Middle East and a marketing budget to further expand the community.
                    </p>
                    <h3 className="text-success">Phase Two:</h3>
                    <p>
                        The community will have enough power to influence governments. At that point, with the help of the site’s data, it will be possible to transparently show how many people want peace, where they are from, and what they are willing to compromise on—with the hope that this will pressure governments to act according to the will of the people.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TXTPage;