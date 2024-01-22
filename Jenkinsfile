pipeline {
    agent any
    
    stages {
        stage('Build Docker image') {
            steps {
                script {
                    bat 'docker build -t booth-frontend .'
                }
            }
        }
        stage ('Update .env') {
            steps {
                script {
                    bat 'del .env'
                }

                script {
                    bat "echo VITE_CITY=%city% >> .env" 
                }

                script {
                    bat "echo VITE_PUBLIC_URL=http://localhost:%port%/api >> .env" 
                }
            }
        }
        stage ('Trigger Downstream Job') {
            steps {
                build(job: 'Voting Booth', parameters: [
                    string(name: 'city', value: city),
                    string(name : 'port', value : port)
                ])
            }
        }
    }

}