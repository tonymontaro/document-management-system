import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import { getDocument } from '../../actions/documentActions';

/**
 * Document Page container
 *
 * @class DocumentPage
 * @extends {React.Component}
 */
export class DocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  /**
  * Retrieves the document before rendering the component
  *
  * @returns {Undefined} nothing
  */
  componentWillMount() {
    this.props.getDocument(this.props.params.id)
      .catch((error) => {
        if (error.response) {
          Materialize.toast('Invalid document id', 2000);
        }
        this.context.router.push('/');
      });
  }

  /**
  * Render the component
  *
  * @returns {Object} jsx object
  */
  render() {
    const { document } = this.props;

    return (
      <div className="document-div">
        <div className="document container">
          <h3>{document.title}</h3>
          <p className="meta-info">posted on: {new Date(document.createdAt).toDateString()},
            by: <span className="teal-text">{document.User ? document.User.username : ''}</span></p>
          <div>{document.content && renderHTML(document.content)}</div>
        </div>
      </div>
    );
  }
}

DocumentPage.propTypes = {
  document: PropTypes.object.isRequired,
  getDocument: PropTypes.func.isRequired,
  params: PropTypes.object
};

DocumentPage.contextTypes = {
  router: PropTypes.array,
};

export default connect(state => ({ document: state.document }), { getDocument })(DocumentPage);
