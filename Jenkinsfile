pipeline {
    agent {
        docker {
            image 'node' 
            args '-p 5000:5000' 
        }
    }
    stages {
        stage("Test"){
            steps{
                sh "echo test"
            }
        }
    }
}